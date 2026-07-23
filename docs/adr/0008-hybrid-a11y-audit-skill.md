## ADR 0008: Claude-as-Judge Hybrid Accessibility Audit Skill

Date: 2026-07-22

### Context

The existing two-tier test strategy (see ADR 0007 and CLAUDE.md's "Testing strategy") catches structural regressions well: `*.test.ts` runs axe-core's automated ruleset per component, `*.e2e.ts` catches visual regressions. Neither can judge the class of WCAG success criteria that need context or vision rather than a static rule check — whether a generic link's surrounding text actually clarifies its destination, whether a focus ring is technically present in computed style but too low-contrast to read, whether an icon survives Windows Forced Colors mode, whether alt text is descriptive rather than a filename or a generic placeholder. axe-core's own documentation is explicit that these are out of automatable scope; a human (or a model that can reason about context and look at a screenshot) has to make the call.

A sibling project, `nano-a11y-audit` (a separate repo, `../nano-a11y-audit` relative to this one), already solves this for arbitrary web pages: a Chrome extension that runs axe-core as a deterministic baseline, then hands DOM context and element screenshots to Gemini Nano (Chrome's on-device small language model) for the criteria axe can't judge, and consolidates both into a W3C EARL report. It's built as a Chrome extension specifically because Gemini Nano's `window.ai` API only exists inside a browser tab — the extension has to capture a screenshot, open a model session, prompt it, and parse a strict-JSON response, once per element that needs judgment.

This repo's own `docs/ROADMAP.md` (Week 3, "The Measurement Suite") separately calls for integrating axe-core into an evaluation script to count WCAG violations across the thesis's Control (raw-HTML) and Experimental (`ct-*`-component-constrained) LLM-generation pipelines — the same underlying need (WCAG measurement beyond what axe alone reports) from a different angle.

### Decision

Port nano-a11y-audit's hybrid methodology into `.claude/skills/sonnet-a11y-audit/` as a Claude Code skill, with one architectural swap: instead of a nested call to a second, separately-hosted model (Gemini Nano via `window.ai`), **Claude Code itself is the reasoning model in the loop.** It's already running the skill, already multimodal, and can read a screenshot with the Read tool and reason about it in the same turn — no browser-embedded model session needed.

Concretely:
- `scripts/lib/audit-engine.mjs` + `scripts/lib/rules.mjs` (DOM extractors ported from `nano-a11y-audit/src/rules/*.js`) run entirely in Playwright, calling no LLM. They produce a `report.json` with every axe-decidable verdict already resolved, and a `pendingReview` array of evidence bundles (DOM context and/or screenshots) for whatever needs judgment.
- `references/wcag-rubrics.md` is the direct descendant of those rule files' `systemPrompt` fields, reworded from "you are an AI, return strict JSON" into direct instructions for the invoking Claude Code session to apply.
- The invoking session reads each `pendingReview` item, applies the matching rubric, and writes the verdict back into `report.json` — the same step nano-a11y-audit's `session.prompt(...)` call performed, just performed by the model already present instead of a second one.
- `scripts/audit-component.mjs` targets one `ct-*` component's Fractal preview (parallel to `pnpm verify:component`'s visual-verification role, for accessibility instead of visual fidelity); `scripts/audit-page.mjs` targets an arbitrary rendered URL — real, hand-written, or LLM-generated — reusing the identical per-component rule engine against every `ct-*` tag found, plus page-level-only checks (page title, site navigation, orientation lock, reflow) no single isolated component could meaningfully violate.
- `scripts/generate-earl-report.mjs` produces the same EARL JSON-LD shape `nano-a11y-audit/src/utils/earl-reporter.js` does, so the same downstream consumer (the W3C WCAG-EM Report Tool) still works — only the engine producing the contextual assertions changed.

### Rationale

- No new infrastructure: no Chrome flags, no on-device model download, no separate extension build/install step. The skill runs anywhere Claude Code and a stock Playwright Chromium already run.
- Arguably *better* judgment than the source project's own approach for two of its weaker points, both upgraded during the port rather than carried over as-is:
  - **Interactive state detection**: nano-a11y-audit's `1.4.1.js`/`2.4.7.js` statically parse `document.styleSheets` text for `:hover`/`:focus` rule bodies — fragile, and blind to Lit's `adoptedStyleSheets`. This skill instead drives a real `.focus()`/`.hover()` and diffs actual computed style, which Playwright can do reliably where a page-embedded content script could not.
  - **Screenshot fidelity**: Playwright's native element-screenshot API made it straightforward to fix a real bug found during testing (a tight bounding-box screenshot silently clips off CSS `outline`, which paints outside the border box) by padding the capture region — evidence nano-a11y-audit's own `captureVisibleTab`-based cropping doesn't appear to account for either.
- Every ct-* component renders into a shadow root (ADR 0006), which nano-a11y-audit's extractors — written against plain server-rendered pages — never had to account for. Porting them required resolving `host.shadowRoot ?? host` before every query, and injecting the two destructive-simulation rules' CSS (text-spacing, forced-colors) directly into the shadow root rather than the host document, for the identical reason `variables.css` can't reach component-internal markup.
- Directly serves `docs/ROADMAP.md`'s Week 3 measurement-suite goal: `audit-page.mjs` is usable as-is (or as a starting point) for comparing WCAG violation counts between the Control and Experimental generation pipelines, with contextual/visual judgment beyond what a bare axe-core integration would report.

### Consequences

- The audit is on-demand, not part of CI — it requires an interactive Claude Code session to resolve `pendingReview` items (there's no batch/headless mode, unlike nano-a11y-audit's CSV-driven batch runner). It complements the two CI-tracked tiers rather than replacing either.
- Rule coverage intentionally excludes 3.1.1/3.1.2 (Language of Page/Parts) — both depend on Chrome's on-device Language Detection API, which needs the same flags/model-download nano-a11y-audit's own README requires Chrome Canary for. A stock Playwright Chromium doesn't have it, and there's no reliable local substitute worth faking. Everything else in `nano-a11y-audit/src/rules/` has a ported equivalent; see the skill's `SKILL.md` "Rule coverage" section for the exact mapping.
- `scripts/lib/rules.mjs`'s per-component extractors and `references/wcag-rubrics.md`'s rubrics are the two files to extend if a new WCAG criterion needs coverage — not a workaround elsewhere, per the pattern this ADR and the skill's own scope notes establish.
- Findings that touch `wcag-data/<name>.json` (this repo's own per-component conformance record) must be surfaced to the user as a proposed diff, never applied silently — it's a checked-in factual claim about the shipped product.
