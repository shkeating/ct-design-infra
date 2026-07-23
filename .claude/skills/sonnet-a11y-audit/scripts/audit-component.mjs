#!/usr/bin/env node
/**
 * Hybrid accessibility audit for one ct-* component's Fractal preview,
 * adapted from nano-a11y-audit's Chrome-extension architecture (axe-core
 * baseline + LLM contextual/visual evaluation) onto Playwright, so Claude
 * Code itself — already sitting in the loop, already multimodal — plays the
 * role Gemini Nano played there, without a nested model API call.
 *
 * All the actual phase logic (axe scan, DOM-context extractors, real
 * focus/hover interaction, destructive CSS simulations) lives in
 * ./lib/audit-engine.mjs, shared with audit-page.mjs — this script's only job
 * is resolving a component name to its Fractal preview URL(s) and rebuilding
 * the component library first.
 *
 * Nothing here calls a language model. It writes `report.json` with every
 * axe verdict already decided, and a `pendingReview` array of evidence
 * bundles (DOM context and/or screenshot paths) for whichever WCAG criteria
 * need a judgment call. SKILL.md tells the invoking Claude Code session to
 * read each one and fill in verdict + reason directly in that same file.
 *
 * Usage:
 *   node audit-component.mjs <component-name> [category/name]
 *   node audit-component.mjs button --variant=secondary
 *   node audit-component.mjs button --all-variants
 *   node audit-component.mjs button --skip-rebuild
 */
import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveComponentDir, loadVariantUrls, ensureFractalServer, rebuild, FRACTAL_URL, log } from "./lib/fractal-server.mjs";
import { auditTag } from "./lib/audit-engine.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../../..");
const CORE_DIR = path.join(ROOT, "packages/core");

function parseArgs(argv) {
  const positional = [];
  const flags = { variant: null, allVariants: false, skipRebuild: false, out: null };
  for (const arg of argv) {
    if (arg === "--all-variants") flags.allVariants = true;
    else if (arg === "--skip-rebuild") flags.skipRebuild = true;
    else if (arg.startsWith("--variant=")) flags.variant = arg.slice("--variant=".length);
    else if (arg.startsWith("--out=")) flags.out = arg.slice("--out=".length);
    else positional.push(arg);
  }
  return { positional, flags };
}

async function auditVariant(browser, name, variant, urlPath, outRoot) {
  const tagName = `ct-${name}`;
  const outDir = path.join(outRoot, variant);
  mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage({ viewport: { width: 900, height: 500 } });
  const url = `${FRACTAL_URL}${urlPath}`;
  log(`Auditing ${tagName} [${variant}] -> ${url}`);

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForFunction((tag) => customElements.get(tag) !== undefined, tagName, { timeout: 5000 });
  await page.waitForTimeout(200);

  const result = await auditTag(page, tagName, outDir);
  await page.close();

  const report = { component: name, variant, url, generatedAt: new Date().toISOString(), ...result };
  const reportPath = path.join(outDir, "report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  return { variant, reportPath, pendingCount: report.pendingReview.length };
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  if (positional.length === 0) {
    console.error("Usage: node audit-component.mjs <component-name|category/name> [--variant=<name>] [--all-variants] [--skip-rebuild]");
    process.exit(1);
  }

  const { name, dir } = resolveComponentDir(ROOT, positional[0]);
  const configPath = path.join(dir, `${name}.config.json`);
  if (!existsSync(configPath)) throw new Error(`No config at ${configPath}`);

  let urls = loadVariantUrls(name, configPath);
  if (!flags.allVariants) {
    urls = flags.variant ? urls.filter((u) => u.variant === flags.variant || u.variant === "default") : urls.filter((u) => u.variant === "default");
  }

  if (!flags.skipRebuild) rebuild(ROOT);

  const teardown = await ensureFractalServer(ROOT);
  const outRoot = flags.out ? path.resolve(flags.out) : path.join(CORE_DIR, ".a11y-audit", name);

  const browser = await chromium.launch();
  const results = [];
  try {
    for (const { variant, path: urlPath } of urls) {
      results.push(await auditVariant(browser, name, variant, urlPath, outRoot));
    }
  } finally {
    await browser.close();
    teardown();
  }

  console.log(JSON.stringify({ component: name, outRoot: path.relative(ROOT, outRoot), variants: results }, null, 2));
  log(`Done. ${results.reduce((s, r) => s + r.pendingCount, 0)} item(s) across ${results.length} variant(s) need contextual review — read each report.json's "pendingReview" array next.`);
}

main().catch((err) => {
  console.error(`[audit-component] ${err.message ?? err}`);
  process.exit(1);
});
