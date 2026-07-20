# New Component Addition Checklist

This checklist outlines the repeatable process for porting a component from the original CivicTheme UI Kit into this modern, Generative UI-ready Web Component design system. 

When you want to bring in a new component, provide the AI with this checklist so all required files (source, schemas, examples) are generated in one go.

## 1. Research & Reference
- [ ] **Find Original Reference — pull from GitHub, not the live Storybook.** https://uikit.civictheme.io/ is JS-rendered and can't be scraped for exact CSS. Instead fetch directly from `raw.githubusercontent.com/civictheme/uikit/main/...`:
  - Compiled component CSS: `packages/sdc/components/<tier>/<component-name>/<component-name>.css` (tier is `01-atoms`, `02-molecules`, or `03-organisms` — list `packages/sdc/components/<tier>` via the GitHub contents API if unsure which). This is the exact selector structure and class-modifier shape to port.
  - Component prop schema: `<component-name>.component.yml` in the same directory — mirror this into the Zod schema in step 3.
  - Resolved token values: `packages/sdc/dist/civictheme.variables.css` — grep it for every `var(--ct-...)` name referenced in the component's compiled CSS to get the exact value (color, spacing, font) to carry into this repo's `tokens.json`. Don't approximate a value that's sitting right there.
- [ ] **Analyze Structure:** Understand the HTML structure, CSS properties, and modifiers used in the original implementation.
- [ ] **Review WCAG Data:** Check the corresponding `wcag-data/<component>.json` file. Not every CivicTheme component has one — if missing, write it, don't skip it and don't shallow-copy the nearest analog's file wholesale. Use an existing file as the structural template (same ~55 standards, same order — e.g. `wcag-data/form.json`), cross-reference genuinely related existing files for applicable generic guidance (a form-control-adjacent atom should look at `form.json`/`search.json`), and write `observations` specific to *this* component's actual behavior for whichever standards actually turn on it. See `wcag-data/label.json` for a worked example — it identifies the standards that matter for label/form-control association specifically (the `for`/`id` programmatic link, the accessible name containing the visible label text) and marks the component's actual core purpose (3.3.2) a genuine Pass rather than reflexively marking everything Conditional.

## 2. Component Implementation (Lit)
- [ ] **Create Directory:** `packages/core/src/components/<category>/<component-name>/`
- [ ] **Reconcile design tokens first:** diff every `var(--ct-...)` found in the reference CSS (step 1) against `packages/tokens/src/tokens.json`. Add whatever's missing in DTCG format using the exact values from `civictheme.variables.css`. Two tiers:
  - **Component-scoped** (the common case): a new top-level key matching the component's kebab-case name, inserted immediately before the file's final closing brace (`button`, `stripe`, `accordion` all follow this shape) — keeps each component's diff in its own non-overlapping region of the file.
  - **Shared theme-role/typography**: when the reference CSS needs a `--ct-color-light-*`/`--ct-color-dark-*`/`--ct-typography-*` value that doesn't exist yet, add it into the existing `color.light`/`color.dark`/`typography.*` object (see `ui/accordion`'s `tokens.json` diff for the reference example) — check it doesn't already exist first.
  Then run `pnpm build:tokens` and confirm the expected `--ct-<path>` names show up in `packages/tokens/dist/variables.css` before writing any component CSS against them.
- [ ] **Create Web Component:** Implement the `<ct-[name]>` in `<component-name>.ts` using Lit.
  - Expose the API using simple string/boolean attributes (`@property({ type: String })`).
  - `static styles` is the **entire** visual spec, not a placeholder — Shadow DOM means no external stylesheet ever reaches this markup. Port the reference CSS rule-for-rule: base rule, every variant class, every size class, light/dark theme combinations, and every interactive state (`:hover`, `:active`, `:focus-visible`, `[disabled]`), each referencing `var(--ct-...)` tokens from step above, never a hardcoded value.
  - Keep the class list shape consistent with the reference (e.g. `.ct-<name>--<variant>.ct-theme-<theme>` as compound classes on one element) so the ported CSS selectors don't need restructuring.
  - Ensure semantic HTML, `role` attributes, and `aria-*` attributes satisfy the WCAG requirements.
  - If the component genuinely needs interactive state (open/close, selection, multi-step — not most components), reuse `packages/core/src/lib/zag/create-machine-service.ts` + `normalize-props.ts` and an already-installed `@zag-js/*` package rather than adding a new state library; see `ui/accordion`.
  - If it has repeatable child items (panels, tabs, list items), consider a parent+child element pair (`ui/accordion`'s `ct-accordion` + `ct-accordion-item`) rather than a JSON array prop.

## 3. Generative UI Groundwork
- [ ] **Create Zod Schema:** Create `<component-name>.schema.ts` defining the exact props, types, and accepted enums for the component. This creates the strict boundaries for AI generation. (Composite components export one schema per element — see `accordion.schema.ts`.)
- [ ] **Manifest/Registry — nothing to do by hand.** `packages/core/registry.json` is generated by `scripts/build-registry.mjs` from `dist/custom-elements.json` as part of `pnpm build:core` — it's gitignored, never hand-edited. Just make sure the component class has a real JSDoc description (the scaffold template already includes one); that becomes the registry's `description` field.
- [ ] **Add Few-Shot Examples:** Create a snippet in `ai-examples/<component-name>.html` with composed HTML demonstrating how to use the component.

## 4. Build & Visual Verification
Don't skip this — passing types and passing tests both say nothing about whether the CSS you wrote in step 2 actually renders correctly. This is how the Button component originally shipped looking like an unstyled default browser button despite compiling cleanly.
- [ ] **Run `pnpm verify:component <component-name>`** (`scripts/verify-component.mjs`). It rebuilds tokens + core (falling back to a bare `vite build` if `tsc` fails for an unrelated reason), reuses an already-running Fractal server or boots and cleanly tears down its own, then screenshots the default context and every `<component-name>.config.json` variant to `packages/core/.verify/<component-name>/*.png` and prints a `getComputedStyle` report (background-color, color, padding, border, font-family/size/weight, letter-spacing, opacity) for each.
- [ ] **Look at the screenshots and diff the printed computed styles** against the values pulled from `civictheme.variables.css` in step 1. `packages/core/.verify/` is gitignored scratch output, not a deliverable.

## 5. Testing & Quality Assurance
- [ ] **Unit & Accessibility Testing:** Create `<component-name>.test.ts` to verify DOM structure, Lit properties/events, and run automated accessibility checks (e.g., using `@open-wc/testing` with `axe`).
- [ ] **Visual Regression & E2E Testing:** Add `<component-name>.e2e.ts` (Playwright, per ADR 0007) navigating to the component's Fractal preview URL(s) (`/components/preview/<component-name>[--<variant>]`) and calling `toHaveScreenshot()`. Verify keyboard navigation and focus states if applicable. Only write the assertions after step 4 has confirmed the render is actually correct, so the baseline isn't a snapshot of a bug.
  - **Check composition first.** If this component can render inside another component's shadow DOM (a shared primitive like `icon`, used internally by `button`/`link`/`tag`), grep for existing usages: `grep -rl "ct-<component-name>" packages/core/src/components --include=*.ts | grep -v "/<component-name>/"`. For each match, check whether that consumer's own e2e-tested `.config.json` variant would now render this component with a visible value. If so, that consumer's baseline needs regenerating too, in the same PR — not as a follow-up.
  - **Baselines come from CI, not your machine.** Screenshots are OS-render-sensitive: CI checks `-chromium-linux.png` files, but a local `--update-snapshots` run on macOS only produces `-chromium-darwin.png`, which CI never reads and which should never be committed. To generate real baselines: `gh workflow run ci.yml --ref <branch> -f update_snapshots=true`, wait for the run, download the artifact (`gh run download <run-id> -n playwright-snapshots -D <tmp-dir>`), `cmp` every `*-linux.png` it contains against what's already committed, and only copy in + commit the ones that are new or intentionally different — after actually looking at them (don't bulk-copy the artifact unreviewed; see ADR 0007's note on this being a real review step, not a rubber stamp).

## 6. Documentation & Final Validation
- [ ] **Fractal Integration:** Create `<component-name>.config.json` and `<component-name>.hbs` for the visual documentation.
- [ ] **Validate Groundwork:** Ensure the component compiles, all tests pass, visual snapshots match expectations, and the schema accurately reflects the Lit properties.

## Parallel porting
When multiple components are being ported concurrently by background agents (each in its own git worktree), see `.claude/skills/add-component/SKILL.md`'s "Parallel porting" section for the non-interactive fallback rules, and `docs/parallel-porting.md` for how a batch gets launched, reviewed, and merged.

## Known gotchas
- `packages/tokens/config.js`'s `css` platform must keep `prefix: "ct"` and the `ts` platform must keep emitting `tokens.d.ts` via `typescript/es6-declarations` — if either regresses, CSS vars silently fall back to browser defaults with no error (the `var(--ct-x, fallback)` pattern used in `_preview.hbs` masks it completely), or `tsc` fails on every `@ct-infra/tokens` import.
- If `/variables.css` or a token import 404s in the browser during Fractal preview, check both that `packages/tokens/dist/` was actually rebuilt *and* that `fractal.config.cjs`'s static mount for `../tokens/dist` is present — same symptom, two different causes, and the Fractal process needs a restart (not just a file edit) to pick up config changes.
- Playwright visual baselines are platform-sensitive: a local `--update-snapshots` run only produces `-darwin.png` files (macOS), which CI never checks and shouldn't be committed. The `-linux.png` baselines CI actually compares against can only come from the `ci.yml` workflow's `update_snapshots` workflow_dispatch input — see the Visual Regression bullet in step 5. This applies to any consumer components affected by a change too, not just the component being added.
