---
name: sonnet-a11y-audit
description: Run a hybrid WCAG accessibility audit (deterministic axe-core scan + Claude's own contextual/visual judgment) against a ct-* component's Fractal preview OR an arbitrary rendered page/URL, adapted from the nano-a11y-audit Chrome extension's architecture onto Playwright. Use when asked to accessibility-audit, WCAG-audit, or a11y-review a component or page (e.g. "audit the button component for accessibility", "check card's WCAG compliance", "audit this generated page for WCAG issues", "does accordion need any wcag-data updates").
---

# Sonnet A11y Audit

Runs the same **hybrid engine** idea as the sibling `nano-a11y-audit` project
(a Gemini Nano-powered Chrome extension living at `../nano-a11y-audit`): axe-core
for deterministic checks, plus a language model for the WCAG success criteria
that need context or vision to judge — orphaned labels, ambiguous link text,
color-only cues, focus-ring visibility, icons that vanish in forced-colors
mode, images of text, meaningful-sequence CSS tricks, and more (the full
mapping from nano's rule files is in "Rule coverage" below).

Two entry points, sharing the same rule engine:

- **`scripts/audit-component.mjs`** — audits one `ct-*` component in isolation
  via this repo's own Fractal preview server. Use this while porting/building
  a component (mirrors the `add-component` skill's verification step, just
  for accessibility instead of visual fidelity).
- **`scripts/audit-page.mjs`** — audits an arbitrary rendered URL: a real page
  assembled from `ct-*` components, hand-written raw HTML, or (per
  `docs/ROADMAP.md`'s Week 3 "integrate axe-core into the evaluation script to
  count WCAG violations") LLM-generated output from either the Control
  (raw-HTML) or Experimental (`ct-*`-constrained) pipeline this repo's thesis
  compares. It finds every `ct-*` tag on the page and runs the exact same
  per-component rule set against each one, plus a handful of checks that only
  make sense at the whole-page level (page title, site navigation,
  orientation locking, reflow).

## The one architectural swap that makes this a *skill* instead of an extension

nano-a11y-audit is a Chrome extension because Gemini Nano only runs **inside**
a browser tab — the extension has to capture a screenshot, hand it to
`window.ai`, get JSON back, and repeat that per element, per page. That's the
whole reason it exists as its own browser surface.

None of that plumbing is needed here, because **the reasoning model in this
skill's loop is Claude Code itself** — already running, already multimodal,
already able to read a PNG with the Read tool and reason about it in the same
turn. Playwright's job shrinks to what a Chrome extension's content-script
API genuinely can't do as well: drive a real browser, extract real DOM
context, trigger real `:focus`/`:hover` states, and take real element
screenshots — then hand all of that straight to you, in your own context
window, instead of round-tripping it through a second model's API.

Concretely:
- `scripts/lib/audit-engine.mjs` never calls an LLM. It only gathers evidence
  (axe-core results it can verdict itself, DOM context ported from
  `nano-a11y-audit/src/rules/*.js`'s extractors, and screenshots) into
  `report.json`'s `pendingReview` array(s).
- `references/wcag-rubrics.md` is the direct descendant of those rule files'
  `systemPrompt`s — reworded from "you are an AI, return strict JSON" into
  instructions for you to apply directly.
- You fill in `pendingReview[].verdict`/`.reason` yourself, in-conversation,
  the same step `audit-runner.js`'s `session.prompt(...)` call used to do.

One more adaptation worth knowing before you run this: every ct-* component
renders into a **shadow root** (CLAUDE.md: "no external or global stylesheet
ever applies to markup inside a component"), but nano-a11y-audit's extractors
were written against plain server-rendered pages with no shadow DOM at all.
Every per-component extractor in `scripts/lib/rules.mjs` resolves
`host.shadowRoot ?? host` before querying, and the destructive-simulation
rules that mutate CSS (text-spacing, forced-colors) inject straight into the
shadow root for the same reason a `<style>` on the host page never would
reach it. Page-level-only rules (see below) query `document` directly since
there's no single element to scope to.

## Running a component audit

1. Resolve which component: ask for a kebab-case name if not given (same
   convention as the `add-component` skill) — `category/name` if ambiguous
   (e.g. `01-atoms/button`), or just `name` if it's unique across tiers.

2. Run the audit:
   ```bash
   node .claude/skills/sonnet-a11y-audit/scripts/audit-component.mjs button
   ```
   This rebuilds tokens+core, boots (or reuses) Fractal on `CT_FRACTAL_PORT`
   (same as `pnpm verify:component`), and audits the component's **default**
   context only. Add `--variant=<name>` for one specific variant, or
   `--all-variants` to sweep every variant in `<name>.config.json` — variants
   often change what's applicable (an `icon` variant introduces an 1.1.1
   check; a `disabled` variant changes what 1.4.11's focus check even means),
   so use `--all-variants` when you want real coverage, not just a quick
   sanity check. Pass `--skip-rebuild` on a re-run against markup you know is
   already current.

   Output lands at `packages/core/.a11y-audit/<name>/<variant>/report.json`
   (gitignored scratch, same treatment as `.verify/`), plus a
   `screenshots/` directory of PNGs it references by relative path.

## Running a page audit

```bash
node .claude/skills/sonnet-a11y-audit/scripts/audit-page.mjs <url>
```

`<url>` can be `http(s)://` (a running dev server, a deployed page) or
`file://` (a static HTML file — e.g. one prompt's output from the
WebAccessBench evaluation suite). No Fractal server, no rebuild — this script
doesn't assume the page has anything to do with this repo's own build output.

Output lands at `packages/core/.a11y-audit/pages/<slugified-url>/report.json`,
shaped differently from a component report: whole-document `axeFindings` at
the top level, `pageLevel: { autoVerdicts, pendingReview }` for the
page-only checks, and `byTag: { "ct-button": { axeFindings, autoVerdicts,
pendingReview }, ... }` — one entry per distinct `ct-*` tag found on the page,
each shaped exactly like a component report's contents. A raw-HTML page
(no `ct-*` tags) still gets a full `axeFindings` + `pageLevel` audit; `byTag`
is just empty.

If you're comparing multiple generated pages (e.g. Control vs. Experimental
pipeline output for the same prompt), run this once per URL/file and diff the
resulting `axeFindings`/`pendingReview` — don't try to pass multiple URLs to
one invocation, each gets its own `report.json` and output directory.

## Reviewing results (both modes)

**Read every `report.json` the run produced.** For each entry in a
`pendingReview` array (component mode: one array at the top level; page mode:
`pageLevel.pendingReview` plus one per `byTag[tag]`):
- Look at `rubricRef` and read the matching section of
  `references/wcag-rubrics.md`.
- Read whatever evidence it points at — `context`/`items` (already inline
  JSON) or `screenshots.*` (paths relative to the report.json's directory —
  Read each PNG).
- Edit the item in place, adding `"verdict"` (`PASS`/`FAIL`/`CANNOT_TELL`)
  and `"reason"` (one or two sentences, specific to what you actually saw —
  not a template restatement of the rubric).

Do this for every `pendingReview` item across every variant/tag the run
covered before moving on — an unresolved item makes the EARL report
understate coverage (`generate-earl-report.mjs` warns and skips it rather
than guessing).

Summarize findings for the user: axe `FAIL`s, your own `FAIL` verdicts, and
anything you marked `CANNOT_TELL` and why. Don't just say "N issues found" —
name the WCAG standard and the specific element/state.

## Downstream: interfaces the audit results feed

**EARL report (same tool nano-a11y-audit targets).** Once every
`pendingReview` item has a verdict:
```bash
node .claude/skills/sonnet-a11y-audit/scripts/generate-earl-report.mjs \
  packages/core/.a11y-audit/button/default/report.json
```
Works on either report shape (component-mode or page-mode — it detects
`byTag` and flattens accordingly) and accepts multiple paths to merge into one
EARL document (e.g. every variant from an `--all-variants` run, or several
page audits). This produces the identical JSON-LD shape
`nano-a11y-audit/src/utils/earl-reporter.js` generates — only the engine that
produced the contextual assertions changed, not the report format — so it
uploads to the same
[W3C WCAG-EM Report Tool](https://www.w3.org/WAI/eval/report-tool/) (Step 4 →
Open an existing report) nano-a11y-audit's `report-injector.js` automates
uploading into. That auto-upload trick (programmatically setting a `File` on
the tool's hidden `<input>` via `DataTransfer` and dispatching `change`) is
itself portable to a Playwright script if the user wants hands-free upload
too — it isn't wired up here by default since it's a one-line manual step and
adding automation nobody asked for is exactly the kind of premature scope this
project's conventions warn against.

**`wcag-data/<name>.json`** (component mode only) — this repo's own
per-component conformance record (referenced by
`component-addition-checklist.md`/the `add-component` skill as something that
must stay accurate, in the `{standard, outcome, observations}` array shape).
Once you have real verdicts, check each finding against that file's existing
`standard` entry for the same WCAG number:

- A `FAIL` you found that the file currently marks `Pass` is a real
  discrepancy — surface it prominently, don't silently "fix" the file.
- A `Conditional` entry the file already carries usually stays `Conditional`
  even after a `PASS` — most of these are about what an *implementer*
  configures (alt text, labels, autocomplete), not something a Fractal
  preview screenshot with placeholder content can resolve on its own.

**Always show the user the specific diff and ask before editing
`wcag-data/<name>.json`** — it's a checked-in factual claim about the shipped
product, not scratch output, and a silent edit here is the kind of action this
project's conventions treat as needing confirmation first.

## Rule coverage

`scripts/lib/rules.mjs` ports every rule file from `nano-a11y-audit/src/rules/`
except the two that can't run here at all:

- **3.1.1 Language of Page / 3.1.2 Language of Parts** — both depend on
  Chrome's on-device Language Detection API, which needs the same
  flags/model-download nano-a11y-audit's own README requires Chrome Canary
  for. This skill runs a stock Playwright Chromium; `self.LanguageDetector`
  is simply undefined there, and there's no reliable local substitute worth
  faking.

Everything else made it in, split three ways:

- **`RULES`** (component-scoped, `kind: "text"` / `"visual-elements"` /
  `"destructive"`) — runs against a single tag's shadow root in both modes.
- **`INTERACTIVE_RULES`** — real `.focus()`/`.hover()` interaction + computed
  style diff, replacing nano's fragile static stylesheet-text parsing
  (`1.4.1.js`'s `hasValidVisualCues`, `2.4.7.js`'s `getFocusStyles`) with an
  actual browser interaction Playwright can trigger reliably.
- **`PAGE_RULES`** (2.4.2 Page Titled, 2.4.5 Multiple Ways, 1.3.4 Orientation)
  — only meaningful across a whole page; a single isolated `<button>` doesn't
  have its own `<title>` or site navigation. Only `audit-page.mjs` runs these.
  1.4.10 Reflow lives in `RULES` instead (its extractor is already
  tag-agnostic) and runs in *both* modes: component mode narrows the Fractal
  preview page's own viewport to 320px (valid since that page renders exactly
  one component), page mode does the same against the real assembled page.

If a WCAG criterion you expect isn't showing up, check this list before
assuming it's a bug — it's either the language pair above, or something that
needs adding to `rules.mjs` rather than a broken run.

## Scope notes

If `<name>` is a parent+child pair (like `ct-accordion`/`ct-accordion-item`),
component-mode auditing the parent covers its own rendered shadow DOM only —
light-DOM-slotted child content isn't recursed into. Audit the child
component separately by name if it has its own Fractal preview; if it
doesn't, note the gap rather than inventing a preview URL for it. Page mode
doesn't have this limitation — `discoverCustomElementTags` finds every
distinct `ct-*` tag actually present in the rendered DOM, light-DOM children
included, and audits each one.
