#!/usr/bin/env node
/**
 * Generates packages/core/registry.json from dist/custom-elements.json (the Custom
 * Elements Manifest vite-plugin-cem already produces during `vite build`), the
 * GenUI-facing manifest project-plan.md calls for.
 *
 * This is intentionally derived from build output rather than hand-maintained: with
 * multiple components landing in parallel (via isolated worktrees), a hand-edited
 * shared registry file would be the worst merge-conflict surface in the repo. Re-run
 * this after any build and it reflects whatever's on disk — no agent ever edits
 * registry.json directly.
 *
 * Usage: node scripts/build-registry.mjs   (run from packages/core, after `tsc && vite build`)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORE_DIR = path.resolve(__dirname, '..');
const CEM_PATH = path.join(CORE_DIR, 'dist/custom-elements.json');
const OUT_PATH = path.join(CORE_DIR, 'registry.json');

if (!existsSync(CEM_PATH)) {
  console.error('[build-registry] dist/custom-elements.json not found — run `tsc && vite build` first.');
  process.exit(1);
}

const cem = JSON.parse(readFileSync(CEM_PATH, 'utf8'));

// dir -> { modulePath, exportNames: Set<string> } for each *.schema.ts module, so a
// custom element can be matched to its Zod schema without importing/evaluating any TS.
const schemaByDir = new Map();
for (const mod of cem.modules ?? []) {
  if (!mod.path.endsWith('.schema.ts')) continue;
  const dir = path.dirname(mod.path);
  const exportNames = (mod.declarations ?? [])
    .filter((d) => d.kind === 'variable' && d.name?.endsWith('Schema'))
    .map((d) => d.name);
  schemaByDir.set(dir, { modulePath: mod.path, exportNames: new Set(exportNames) });
}

// ct-accordion-item -> AccordionItemSchema
function expectedSchemaExportName(tagName) {
  const pascal = tagName
    .replace(/^ct-/, '')
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return `${pascal}Schema`;
}

const registry = [];
for (const mod of cem.modules ?? []) {
  const dir = path.dirname(mod.path);
  const categoryMatch = mod.path.match(/^src\/components\/([^/]+)\//);
  const category = categoryMatch ? categoryMatch[1] : null;

  for (const decl of mod.declarations ?? []) {
    if (decl.kind !== 'class' || !decl.customElement || !decl.tagName) continue;

    const schemaExportName = expectedSchemaExportName(decl.tagName);
    const schemaEntry = schemaByDir.get(dir);
    const hasSchema = schemaEntry?.exportNames.has(schemaExportName) ?? false;

    registry.push({
      tag: decl.tagName,
      category,
      description: decl.description || null,
      schema: hasSchema ? { module: schemaEntry.modulePath, export: schemaExportName } : null,
      attributes: (decl.attributes ?? []).map((a) => ({
        name: a.name,
        type: a.type?.text ?? null,
        default: a.default ?? null,
        description: a.description ?? null,
      })),
    });
  }
}

registry.sort((a, b) => a.tag.localeCompare(b.tag));

writeFileSync(OUT_PATH, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
console.log(`[build-registry] Wrote ${registry.length} component(s) to ${path.relative(CORE_DIR, OUT_PATH)}`);

const missingSchema = registry.filter((r) => !r.schema);
if (missingSchema.length) {
  console.warn(`[build-registry] No schema found for: ${missingSchema.map((r) => r.tag).join(', ')}`);
}