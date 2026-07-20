// Regenerates src/index.ts from every component file under src/components/.
//
// index.ts used to be hand-appended to by whoever ported a component (see
// docs/parallel-porting.md) — every parallel branch touching the same trailing
// lines was a guaranteed merge conflict on landing. Generating it here, the same
// way scripts/build-registry.mjs derives registry.json, means no branch edits this
// file at all, so there's nothing left to conflict on.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(__dirname, '../src/components');
const indexPath = path.resolve(__dirname, '../src/index.ts');

const EXCLUDE_SUFFIXES = ['.schema.ts', '.test.ts', '.e2e.ts', '.d.ts'];

function findComponentFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findComponentFiles(fullPath));
    } else if (entry.name.endsWith('.ts') && !EXCLUDE_SUFFIXES.some((suffix) => entry.name.endsWith(suffix))) {
      files.push(fullPath);
    }
  }
  return files;
}

const relativePaths = findComponentFiles(componentsDir)
  .map((file) => `./${path.relative(path.dirname(indexPath), file).replace(/\.ts$/, '.js')}`)
  .map((p) => (p.startsWith('.') ? p : `./${p}`))
  .sort();

const contents = relativePaths.map((p) => `export * from "${p}";`).join('\n') + '\n';

fs.writeFileSync(indexPath, contents, 'utf8');
console.log(`Generated src/index.ts (${relativePaths.length} component export${relativePaths.length === 1 ? '' : 's'}).`);
