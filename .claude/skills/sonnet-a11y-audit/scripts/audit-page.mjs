#!/usr/bin/env node
/**
 * Hybrid accessibility audit for an arbitrary rendered page — not a Fractal
 * component preview, but real (or LLM-generated) HTML: a page assembled from
 * ct-* components, raw hand-written HTML, or an LLM's output in either style.
 *
 * This is the complement to audit-component.mjs (which audits ct-* components
 * in isolation, one at a time, against this repo's own Fractal server) and is
 * the direct equivalent of what nano-a11y-audit was actually built to do —
 * batch-audit arbitrary URLs — plus it's what this repo's own
 * docs/ROADMAP.md Week 3 ("Integrate the axe-core API into the evaluation
 * script to automatically count WCAG 2.1 AA violations (DV 1)") calls for:
 * comparing the Control pipeline's raw-HTML output against the Experimental
 * pipeline's ct-* component output on accessibility, not just axe's violation
 * count but the same contextual/visual judgment audit-component.mjs applies.
 *
 * What it does, against one URL:
 *   1. Runs axe-core against the whole document (not scoped to any element).
 *   2. Finds every `ct-*` custom element tag present on the page (empty list
 *      for a raw-HTML/Control-pipeline page — that's fine, it just means
 *      steps 2/3 contribute nothing and axe + page-level checks still run)
 *      and runs the full per-component rule set (./lib/audit-engine.mjs's
 *      auditTag, shared with audit-component.mjs) against each one.
 *   3. Runs the page-level-only checks no single isolated component could
 *      meaningfully violate on its own: 2.4.2 Page Titled, 2.4.5 Multiple
 *      Ways, 1.3.4 Orientation, 1.4.10 Reflow.
 *
 * Like audit-component.mjs, nothing here calls a language model — it writes
 * `report.json` with axe verdicts already decided and a `pendingReview` array
 * (now grouped `byTag`, plus a page-level array) for the invoking Claude Code
 * session to fill in, exactly as SKILL.md describes.
 *
 * Usage:
 *   node audit-page.mjs <url> [--out=<dir>]
 *   node audit-page.mjs http://localhost:8080/generated/prompt-014.html
 *   node audit-page.mjs file:///tmp/webaccessbench/control/prompt-014.html
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { log } from "./lib/fractal-server.mjs";
import { auditTag, runPageAxePhase, runPageLevelPhase, discoverCustomElementTags } from "./lib/audit-engine.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../../..");

function parseArgs(argv) {
  const positional = [];
  const flags = { out: null };
  for (const arg of argv) {
    if (arg.startsWith("--out=")) flags.out = arg.slice("--out=".length);
    else positional.push(arg);
  }
  return { positional, flags };
}

function slugForUrl(url) {
  return url.replace(/^https?:\/\//, "").replace(/^file:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "page";
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  if (positional.length === 0) {
    console.error("Usage: node audit-page.mjs <url> [--out=<dir>]");
    process.exit(1);
  }
  const url = positional[0];
  const outRoot = flags.out ? path.resolve(flags.out) : path.join(ROOT, "packages/core/.a11y-audit/pages", slugForUrl(url));
  mkdirSync(outRoot, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  let report;
  try {
    log(`Auditing page -> ${url}`);
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(200);

    const axePhase = await runPageAxePhase(page);
    const tags = await discoverCustomElementTags(page);
    log(`Found ${tags.length} ct-* custom element tag(s): ${tags.join(", ") || "(none — raw HTML page)"}`);

    const byTag = {};
    for (const tag of tags) {
      const tagOutDir = path.join(outRoot, tag);
      mkdirSync(tagOutDir, { recursive: true });
      byTag[tag] = await auditTag(page, tag, tagOutDir);
    }

    const pageLevelOutDir = path.join(outRoot, "_page");
    mkdirSync(pageLevelOutDir, { recursive: true });
    const pageLevelPhase = await runPageLevelPhase(page, pageLevelOutDir);

    report = {
      url,
      generatedAt: new Date().toISOString(),
      customElementTags: tags,
      axeFindings: axePhase.findings || [],
      axeError: axePhase.error,
      pageLevel: { autoVerdicts: pageLevelPhase.autoVerdicts, pendingReview: pageLevelPhase.pendingReview },
      byTag,
    };
  } finally {
    await browser.close();
  }

  const reportPath = path.join(outRoot, "report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  const totalPending =
    report.pageLevel.pendingReview.length + Object.values(report.byTag).reduce((sum, t) => sum + t.pendingReview.length, 0);
  console.log(JSON.stringify({ url, outRoot: path.relative(ROOT, outRoot), reportPath: path.relative(ROOT, reportPath), tagsFound: report.customElementTags, pendingCount: totalPending }, null, 2));
  log(`Done. ${totalPending} item(s) need contextual review — read "${path.relative(ROOT, reportPath)}"'s "pageLevel.pendingReview" and each tag's "pendingReview" next.`);
}

main().catch((err) => {
  console.error(`[audit-page] ${err.message ?? err}`);
  process.exit(1);
});
