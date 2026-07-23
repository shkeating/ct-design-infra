// Shared per-custom-element audit logic: axe-core baseline, DOM-context
// extraction, real focus/hover interaction, and destructive CSS simulations.
// Factored out of audit-component.mjs so audit-page.mjs (arbitrary URLs, one
// or more ct-* elements per page) can reuse the exact same rule set instead of
// duplicating it — a page audit is just "run auditTag() for every ct-* tag
// found on the page, plus a handful of page-level-only rules no single
// isolated element can meaningfully violate on its own."
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RULES, INTERACTIVE_RULES, PAGE_RULES } from "./rules.mjs";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AXE_PATH = require.resolve("axe-core/axe.min.js");
const AXE_EARL_MAP = JSON.parse(readFileSync(path.join(__dirname, "../../references/axe-earl-map.json"), "utf8"));

function mapAxeResults(raw) {
  if (raw.error) return { error: raw.error, findings: [] };
  const findings = [];
  const mapItems = (items, verdict) => {
    for (const item of items) {
      const mapping = AXE_EARL_MAP[item.id];
      if (!mapping) continue; // not one of the SCs this skill scopes to review
      const nodeDetails = item.nodes
        .map((n) => `- ${n.target.join(", ")}${n.html ? ` (\`${n.html.slice(0, 100).replace(/\n/g, " ")}\`)` : ""}\n  Fix: ${n.failureSummary || "Check element"}`)
        .join("\n");
      findings.push({
        source: "axe-core",
        ruleId: item.id,
        earlId: mapping.earlId,
        standard: mapping.standard,
        verdict,
        reason: `${item.help}\n${nodeDetails || item.description}`,
      });
    }
  };
  mapItems(raw.violations, "FAIL");
  mapItems(raw.passes, "PASS");
  mapItems(raw.incomplete, "CANNOT_TELL");
  mapItems(raw.inapplicable, "INAPPLICABLE");
  return { findings };
}

const AXE_RUN_OPTIONS = {
  resultTypes: ["violations", "passes", "incomplete", "inapplicable"],
  runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
};

export async function hasRelevantElements(page, tagName, selectors) {
  return page.evaluate(
    ({ tag, sels }) => {
      const host = document.querySelector(tag);
      const root = host?.shadowRoot ?? host;
      if (!root) return false;
      return sels.some((s) => {
        try {
          return root.querySelector(s) !== null;
        } catch {
          return false;
        }
      });
    },
    { tag: tagName, sels: selectors },
  );
}

export async function runAxePhase(page, tagName) {
  await page.addScriptTag({ path: AXE_PATH });
  const raw = await page.evaluate(
    async ({ tag, options }) => {
      const host = document.querySelector(tag);
      if (!host) return { error: `Custom element <${tag}> not found on page.` };
      // eslint-disable-next-line no-undef
      return await axe.run(host, options);
    },
    { tag: tagName, options: AXE_RUN_OPTIONS },
  );
  return mapAxeResults(raw);
}

// Whole-document axe scan for audit-page.mjs — no single custom element to
// scope to, so this runs against `document` the way axe-core's own default
// usage (and nano-a11y-audit's axe-runner.js, which audits full pages) does.
export async function runPageAxePhase(page) {
  await page.addScriptTag({ path: AXE_PATH });
  const raw = await page.evaluate(async (options) => {
    // eslint-disable-next-line no-undef
    return await axe.run(document, options);
  }, AXE_RUN_OPTIONS);
  return mapAxeResults(raw);
}

// Finds every custom element tag present on the page whose name matches the
// `prefix` (default `ct-`, this repo's Style Dictionary/component prefix —
// see CLAUDE.md). A page built with the Control (raw-HTML) pipeline will
// simply yield an empty list here, which is fine — axe + PAGE_RULES still run.
export async function discoverCustomElementTags(page, prefix = "ct-") {
  return page.evaluate((p) => {
    const tags = new Set();
    document.querySelectorAll("*").forEach((el) => {
      const tag = el.tagName.toLowerCase();
      if (tag.startsWith(p)) tags.add(tag);
    });
    return [...tags];
  }, prefix);
}

// 2.4.2/2.4.5 need no viewport mutation and no per-element scoping — they read
// `document` directly. 1.3.4/1.4.10 each need a specific viewport (a locked
// mobile-portrait size, and exactly 320px width respectively) so they're run
// here rather than through the generic text-rule loop, with the viewport
// restored afterward regardless of outcome.
export async function runPageLevelPhase(page, outDir) {
  const autoVerdicts = [];
  const pendingReview = [];
  mkdirSync(path.join(outDir, "screenshots"), { recursive: true });
  const originalViewport = page.viewportSize();

  for (const rule of PAGE_RULES.filter((r) => r.id === "2.4.2" || r.id === "2.4.5")) {
    const result = await page.evaluate(rule.extractor);
    if (result.computedVerdict) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: result.computedVerdict, reason: result.reason });
    } else {
      pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "text", rubricRef: rule.rubricRef, context: result });
    }
  }

  // 1.3.4 Orientation — force a mobile-portrait viewport, matching how
  // nano-a11y-audit's 1.3.4-landscape.js used Emulation.setDeviceMetricsOverride,
  // just via Playwright's native (and simpler) viewport API instead of CDP.
  {
    const rule = PAGE_RULES.find((r) => r.id === "1.3.4");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(150);
    const result = await page.evaluate(rule.extractor);
    const screenshot = path.join("screenshots", "1.3.4-portrait.png");
    await page.screenshot({ path: path.join(outDir, screenshot) }).catch(() => {});
    if (result.computedVerdict) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: result.computedVerdict, reason: result.reason });
    } else {
      pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, context: result, screenshots: { portrait: screenshot } });
    }
  }

  // 1.4.10 Reflow — 320px viewport width, reusing RULES' existing extractor
  // (already document-scoped and tagName-agnostic) rather than duplicating it.
  {
    const rule = RULES.find((r) => r.id === "1.4.10");
    await page.setViewportSize({ width: 320, height: 640 });
    await page.waitForTimeout(150);
    const result = await page.evaluate(rule.extractor);
    const screenshot = path.join("screenshots", "1.4.10-320px.png");
    await page.screenshot({ path: path.join(outDir, screenshot), fullPage: true }).catch(() => {});
    if (result.computedVerdict) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: result.computedVerdict, reason: result.reason });
    } else {
      pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, context: result, screenshots: { narrow: screenshot } });
    }
  }

  if (originalViewport) await page.setViewportSize(originalViewport);
  return { autoVerdicts, pendingReview };
}

export async function runTextRulesPhase(page, tagName) {
  const autoVerdicts = [];
  const pendingReview = [];

  for (const rule of RULES.filter((r) => r.kind === "text")) {
    const applicable = rule.relevantSelectors.includes("*") || (await hasRelevantElements(page, tagName, rule.relevantSelectors));
    if (!applicable) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: "INAPPLICABLE", reason: "No relevant elements found." });
      continue;
    }

    const result = await page.evaluate(rule.extractor, tagName);
    if (result.computedVerdict) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: result.computedVerdict, reason: result.reason });
    } else {
      pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "text", rubricRef: rule.rubricRef, context: result });
    }
  }
  return { autoVerdicts, pendingReview };
}

// Rules whose extractor tags each matched element with a unique
// `data-a11y-*` attribute and returns `{ images: [{ selector, ... }] }` —
// the orchestrator re-locates and screenshots each one individually (a
// component can contain several distinct icons/images that each need their
// own visual judgment, unlike the single default/focus pair 1.4.11/2.4.7 need).
export async function runVisualElementsPhase(page, tagName, outDir) {
  const autoVerdicts = [];
  const pendingReview = [];
  mkdirSync(path.join(outDir, "screenshots"), { recursive: true });

  for (const rule of RULES.filter((r) => r.kind === "visual-elements")) {
    const applicable = await hasRelevantElements(page, tagName, rule.relevantSelectors);
    if (!applicable) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: "INAPPLICABLE", reason: "No relevant elements found." });
      continue;
    }

    const result = await page.evaluate(rule.extractor, tagName);
    if (result.computedVerdict) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: result.computedVerdict, reason: result.reason });
      continue;
    }

    const items = [];
    for (const [i, img] of result.images.entries()) {
      const locator = page.locator(tagName).locator(img.selector);
      const shotPath = path.join("screenshots", `${rule.id}-${i}.png`);
      await screenshotWithPadding(page, locator, path.join(outDir, shotPath)).catch(() => {});
      items.push({ ...img, screenshot: shotPath });
    }
    pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, items });
  }
  return { autoVerdicts, pendingReview };
}

function isTransparentColor(color) {
  if (!color) return true;
  if (color === "transparent") return true;
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (m && m[4] !== undefined && parseFloat(m[4]) === 0) return true;
  return false;
}

// Playwright's `locator.screenshot()` clips exactly to the element's own
// border box. CSS `outline` (and any `outline-offset`) paints *outside* that
// box by spec, so a tight element screenshot silently clips off the very
// focus ring 1.4.11/2.4.7 exist to check — the ring can be computed-style
// "present" and still invisible in the screenshot. Pad the clip region instead.
export async function screenshotWithPadding(page, locator, filePath, padding = 20) {
  const box = await locator.boundingBox();
  if (!box) {
    await locator.screenshot({ path: filePath }).catch(() => {});
    return;
  }
  const viewport = page.viewportSize();
  const clip = {
    x: Math.max(0, box.x - padding),
    y: Math.max(0, box.y - padding),
    width: box.width + padding * 2,
    height: box.height + padding * 2,
  };
  if (viewport) {
    clip.width = Math.min(clip.width, viewport.width - clip.x);
    clip.height = Math.min(clip.height, viewport.height - clip.y);
  }
  await page.screenshot({ path: filePath, clip }).catch(() => locator.screenshot({ path: filePath }).catch(() => {}));
}

async function captureComputedStyle(handle) {
  return handle.evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      outlineStyle: s.outlineStyle,
      outlineWidth: s.outlineWidth,
      outlineColor: s.outlineColor,
      borderStyle: s.borderStyle,
      borderColor: s.borderColor,
      borderBottomStyle: s.borderBottomStyle,
      borderBottomColor: s.borderBottomColor,
      backgroundColor: s.backgroundColor,
      boxShadow: s.boxShadow,
      textDecorationLine: s.textDecorationLine,
      fontWeight: s.fontWeight,
    };
  });
}

function diffStyles(before, after) {
  const diff = {
    outlineChanged:
      before.outlineStyle !== after.outlineStyle || before.outlineWidth !== after.outlineWidth || before.outlineColor !== after.outlineColor,
    borderChanged: before.borderStyle !== after.borderStyle || before.borderColor !== after.borderColor,
    borderBottomChanged: before.borderBottomStyle !== after.borderBottomStyle || before.borderBottomColor !== after.borderBottomColor,
    boxShadowChanged: before.boxShadow !== after.boxShadow,
    backgroundChanged: before.backgroundColor !== after.backgroundColor,
    textDecorationChanged: before.textDecorationLine !== after.textDecorationLine,
    fontWeightChanged: before.fontWeight !== after.fontWeight,
    focusOutlineTransparent: isTransparentColor(after.outlineColor) && after.outlineStyle !== "none" ? false : isTransparentColor(after.outlineColor),
  };
  diff.hasAnyVisibleChange =
    diff.outlineChanged || diff.borderChanged || diff.borderBottomChanged || diff.boxShadowChanged || diff.backgroundChanged || diff.textDecorationChanged || diff.fontWeightChanged;
  return diff;
}

// Real interaction rather than static CSS-rule-text parsing (what
// nano-a11y-audit's 1.4.1.js did to detect `:hover`/`:focus` cues, fragile and
// blind to Lit's adoptedStyleSheets) — Playwright can trigger the actual state
// and read real computed style, which a content script embedded in an
// arbitrary page couldn't do as reliably.
async function triggerState(el, state) {
  if (state === "focus") await el.focus().catch(() => {});
  else if (state === "hover") await el.hover().catch(() => {});
}

async function revertState(page, el, state) {
  if (state === "focus") await el.evaluate((node) => node.blur()).catch(() => {});
  else if (state === "hover") await page.mouse.move(0, 0).catch(() => {});
}

export async function runInteractivePhase(page, tagName, outDir) {
  const pendingReview = [];
  const autoVerdicts = [];
  mkdirSync(path.join(outDir, "screenshots"), { recursive: true });

  for (const rule of INTERACTIVE_RULES) {
    const applicable = await hasRelevantElements(page, tagName, rule.relevantSelectors);
    if (!applicable) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: "INAPPLICABLE", reason: "No relevant elements found." });
      continue;
    }

    const selector = rule.relevantSelectors.join(", ");
    const locator = page.locator(tagName).locator(selector);
    const count = Math.min(await locator.count(), 3);
    const screenshots = [];
    const styleDiffs = [];

    for (let i = 0; i < count; i++) {
      const el = locator.nth(i);
      const idSlug = `${rule.id}-${i}`;

      const before = await captureComputedStyle(el);
      const defaultShot = path.join("screenshots", `${idSlug}-default.png`);
      await screenshotWithPadding(page, el, path.join(outDir, defaultShot));

      const shots = { default: defaultShot };
      const states = {};
      for (const state of rule.states) {
        await triggerState(el, state);
        const styles = await captureComputedStyle(el);
        const shotPath = path.join("screenshots", `${idSlug}-${state}.png`);
        await screenshotWithPadding(page, el, path.join(outDir, shotPath));
        await revertState(page, el, state);
        shots[state] = shotPath;
        states[state] = { styles, diff: diffStyles(before, styles) };
      }

      screenshots.push({ index: i, ...shots });
      styleDiffs.push({ index: i, before, states });
    }

    if (rule.id === "2.4.7") {
      // A clear, non-transparent style change on focus is a strong automatic PASS signal.
      // Anything murkier (a change that's present but might be too subtle/transparent to
      // actually read as "visible") gets escalated to Claude with the same screenshots.
      const focusDiffs = styleDiffs.map((d) => d.states.focus.diff);
      const allClear = focusDiffs.every((d) => d.hasAnyVisibleChange && !d.focusOutlineTransparent);
      const noneChanged = focusDiffs.every((d) => !d.hasAnyVisibleChange);
      if (noneChanged) {
        autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: "FAIL", reason: "No computed-style change detected on focus for any sampled element — focus indicator is likely missing." });
      } else if (allClear) {
        autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: "PASS", reason: "A visible, non-transparent style change was detected on focus for every sampled element." });
      } else {
        pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, screenshots, styleDiffs });
      }
    } else {
      // 1.4.11 (non-text contrast) and 1.4.1-link (color-only link distinction)
      // always defer to visual judgment — color math on computed style alone is
      // unreliable against gradients/tokens, same reasoning nano-a11y-audit used
      // to always route these through the (there: Gemini Nano) visual model.
      pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, screenshots, styleDiffs });
    }
  }

  return { autoVerdicts, pendingReview };
}

export async function runDestructivePhase(page, tagName, outDir) {
  const pendingReview = [];
  const autoVerdicts = [];
  mkdirSync(path.join(outDir, "screenshots"), { recursive: true });
  const el = page.locator(tagName).first();

  // 1.4.12 Text Spacing — inject straight into the shadow root
  {
    const rule = RULES.find((r) => r.id === "1.4.12");
    const applicable = await hasRelevantElements(page, tagName, rule.relevantSelectors);
    if (applicable) {
      const beforeShot = path.join("screenshots", "1.4.12-before.png");
      await screenshotWithPadding(page, el, path.join(outDir, beforeShot));

      await page.evaluate(
        ({ tag, css }) => {
          const host = document.querySelector(tag);
          const root = host?.shadowRoot;
          if (!root) return;
          const style = document.createElement("style");
          style.id = "a11y-audit-text-spacing";
          style.textContent = css;
          root.appendChild(style);
        },
        { tag: tagName, css: rule.spacingCss },
      );
      await page.waitForTimeout(100);

      const result = await page.evaluate(rule.extractor, tagName);
      const afterShot = path.join("screenshots", "1.4.12-after.png");
      await screenshotWithPadding(page, el, path.join(outDir, afterShot));

      await page.evaluate((tag) => {
        const host = document.querySelector(tag);
        host?.shadowRoot?.getElementById("a11y-audit-text-spacing")?.remove();
      }, tagName);
      await page.waitForTimeout(150); // let the removal's repaint settle before the next phase screenshots

      if (result.computedVerdict) {
        autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: result.computedVerdict, reason: result.reason });
      } else {
        pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, context: result, screenshots: { before: beforeShot, after: afterShot } });
      }
    } else {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: "INAPPLICABLE", reason: "No text-bearing elements found." });
    }
  }

  // Forced Colors (High Contrast Mode simulation) — inject into shadow root
  {
    const rule = RULES.find((r) => r.id === "HC");
    const applicable = await hasRelevantElements(page, tagName, rule.relevantSelectors);
    if (applicable) {
      const beforeShot = path.join("screenshots", "HC-before.png");
      await screenshotWithPadding(page, el, path.join(outDir, beforeShot));

      await page.evaluate(
        ({ tag, css }) => {
          const host = document.querySelector(tag);
          const root = host?.shadowRoot;
          if (!root) return;
          const style = document.createElement("style");
          style.id = "a11y-audit-forced-colors";
          style.textContent = css;
          root.appendChild(style);
        },
        { tag: tagName, css: rule.forcedColorsCss },
      );
      await page.waitForTimeout(100);
      const afterShot = path.join("screenshots", "HC-after.png");
      await screenshotWithPadding(page, el, path.join(outDir, afterShot));
      await page.evaluate((tag) => {
        const host = document.querySelector(tag);
        host?.shadowRoot?.getElementById("a11y-audit-forced-colors")?.remove();
      }, tagName);
      await page.waitForTimeout(150); // let the removal's repaint settle before the next phase screenshots

      pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, screenshots: { before: beforeShot, after: afterShot } });
    } else {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: "INAPPLICABLE", reason: "No interactive/graphical elements found." });
    }
  }

  // 1.4.4 Resize Text — simulate 200% zoom via Chromium's non-standard `zoom`
  // CSS property (real layout recalculation, unlike `transform: scale`); this
  // is a heuristic simulation, same caveat nano-a11y-audit's README states for
  // its own CSS-transform-based zoom simulation.
  {
    const rule = RULES.find((r) => r.id === "1.4.4");
    const beforeShot = path.join("screenshots", "1.4.4-before.png");
    await page.screenshot({ path: path.join(outDir, beforeShot) }).catch(() => {});
    await page.evaluate((tag) => {
      const host = document.querySelector(tag);
      if (host) host.style.zoom = "2";
    }, tagName);
    await page.waitForTimeout(100);
    const afterShot = path.join("screenshots", "1.4.4-after.png");
    await page.screenshot({ path: path.join(outDir, afterShot) }).catch(() => {});
    await page.evaluate((tag) => {
      const host = document.querySelector(tag);
      if (host) host.style.zoom = "";
    }, tagName);

    pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, screenshots: { before: beforeShot, after: afterShot } });
  }

  // 1.4.10 Reflow — a Fractal preview page renders exactly one component, so
  // narrowing the *page's* viewport to 320px and checking for a horizontal
  // scrollbar is a valid proxy for "does this component force 2D scrolling on
  // a mobile viewport," same reasoning runPageLevelPhase uses for a real page.
  // Most atoms/molecules will trivially PASS; this mainly matters for wide
  // organisms/templates (banner, alert, next-steps).
  {
    const rule = RULES.find((r) => r.id === "1.4.10");
    const originalViewport = page.viewportSize();
    await page.setViewportSize({ width: 320, height: 640 });
    await page.waitForTimeout(150);
    const result = await page.evaluate(rule.extractor);
    const screenshot = path.join("screenshots", "1.4.10-320px.png");
    await page.screenshot({ path: path.join(outDir, screenshot), fullPage: true }).catch(() => {});
    if (originalViewport) await page.setViewportSize(originalViewport);
    await page.waitForTimeout(100);

    if (result.computedVerdict) {
      autoVerdicts.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, verdict: result.computedVerdict, reason: result.reason });
    } else {
      pendingReview.push({ id: rule.id, standard: rule.standard, earlId: rule.earlId, kind: "visual", rubricRef: rule.rubricRef, context: result, screenshots: { narrow: screenshot } });
    }
  }

  return { autoVerdicts, pendingReview };
}

// Runs every phase for a single custom element already present on `page` and
// returns the merged {axeFindings, axeError, autoVerdicts, pendingReview}
// shape both audit-component.mjs (one tag, Fractal preview) and
// audit-page.mjs (every ct-* tag found on an arbitrary URL) write into their
// respective report.json files.
export async function auditTag(page, tagName, outDir) {
  const axePhase = await runAxePhase(page, tagName);
  const textPhase = await runTextRulesPhase(page, tagName);
  const visualElementsPhase = await runVisualElementsPhase(page, tagName, outDir);
  const interactivePhase = await runInteractivePhase(page, tagName, outDir);
  const destructivePhase = await runDestructivePhase(page, tagName, outDir);

  return {
    tagName,
    axeFindings: axePhase.findings || [],
    axeError: axePhase.error,
    autoVerdicts: [...textPhase.autoVerdicts, ...visualElementsPhase.autoVerdicts, ...interactivePhase.autoVerdicts, ...destructivePhase.autoVerdicts],
    pendingReview: [...textPhase.pendingReview, ...visualElementsPhase.pendingReview, ...interactivePhase.pendingReview, ...destructivePhase.pendingReview],
  };
}
