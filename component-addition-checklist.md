# New Component Addition Checklist

This checklist outlines the repeatable process for porting a component from the original CivicTheme UI Kit into this modern, Generative UI-ready Web Component design system. 

When you want to bring in a new component, provide the AI with this checklist so all required files (source, schemas, examples) are generated in one go.

## 1. Research & Reference
- [ ] **Find Original Reference — pull from GitHub, not the live Storybook.** https://uikit.civictheme.io/ is JS-rendered and can't be scraped for exact CSS. Instead fetch directly from `raw.githubusercontent.com/civictheme/uikit/main/...`:
  - Compiled component CSS: `packages/sdc/components/<tier>/<component-name>/<component-name>.css` (tier is `01-atoms`, `02-molecules`, or `03-organisms` — list `packages/sdc/components/<tier>` via the GitHub contents API if unsure which). This is the exact selector structure and class-modifier shape to port.
  - Component prop schema: `<component-name>.component.yml` in the same directory — mirror this into the Zod schema in step 3.
  - Resolved token values: `packages/sdc/dist/civictheme.variables.css` — grep it for every `var(--ct-...)` name referenced in the component's compiled CSS to get the exact value (color, spacing, font) to carry into this repo's `tokens.json`. Don't approximate a value that's sitting right there.
- [ ] **Analyze Structure:** Understand the HTML structure, CSS properties, and modifiers used in the original implementation.
- [ ] **Review WCAG Data:** Check the corresponding `wcag-data/<component>.json` file (or create it if missing) to understand the accessibility requirements.

## 2. Component Implementation (Lit)
- [ ] **Create Directory:** `packages/core/src/components/<category>/<component-name>/`
- [ ] **Reconcile design tokens first:** diff every `var(--ct-...)` found in the reference CSS (step 1) against `packages/tokens/src/tokens.json`. Add whatever's missing in DTCG format using the exact values from `civictheme.variables.css` — extend an existing top-level category (`color`, `spacing`, `typography`) or add a new component-scoped one (e.g. `button`). Then run `pnpm build:tokens` and confirm the expected `--ct-<path>` names show up in `packages/tokens/dist/variables.css` before writing any component CSS against them.
- [ ] **Create Web Component:** Implement the `<ct-[name]>` in `<component-name>.ts` using Lit.
  - Expose the API using simple string/boolean attributes (`@property({ type: String })`).
  - `static styles` is the **entire** visual spec, not a placeholder — Shadow DOM means no external stylesheet ever reaches this markup. Port the reference CSS rule-for-rule: base rule, every variant class, every size class, light/dark theme combinations, and every interactive state (`:hover`, `:active`, `:focus-visible`, `[disabled]`), each referencing `var(--ct-...)` tokens from step above, never a hardcoded value.
  - Keep the class list shape consistent with the reference (e.g. `.ct-<name>--<variant>.ct-theme-<theme>` as compound classes on one element) so the ported CSS selectors don't need restructuring.
  - Ensure semantic HTML, `role` attributes, and `aria-*` attributes satisfy the WCAG requirements.

## 3. Generative UI Groundwork
- [ ] **Create Zod Schema:** Create `<component-name>.schema.ts` defining the exact props, types, and accepted enums for the component. This creates the strict boundaries for AI generation.
- [ ] **Update Manifest/Registry:** Add the component to the central machine-readable manifest (e.g. `registry.json`) mapping the tag name to its schema and semantic description.
- [ ] **Add Few-Shot Examples:** Create a snippet in `ai-examples/<component-name>.html` with composed HTML demonstrating how to use the component.

## 4. Build & Visual Verification
Don't skip this — passing types and passing tests both say nothing about whether the CSS you wrote in step 2 actually renders correctly. This is how the Button component originally shipped looking like an unstyled default browser button despite compiling cleanly.
- [ ] **Run `pnpm verify:component <component-name>`** (`scripts/verify-component.mjs`). It rebuilds tokens + core (falling back to a bare `vite build` if `tsc` fails for an unrelated reason), reuses an already-running Fractal server or boots and cleanly tears down its own, then screenshots the default context and every `<component-name>.config.json` variant to `packages/core/.verify/<component-name>/*.png` and prints a `getComputedStyle` report (background-color, color, padding, border, font-family/size/weight, letter-spacing, opacity) for each.
- [ ] **Look at the screenshots and diff the printed computed styles** against the values pulled from `civictheme.variables.css` in step 1. `packages/core/.verify/` is gitignored scratch output, not a deliverable.

## 5. Testing & Quality Assurance
- [ ] **Unit & Accessibility Testing:** Create `<component-name>.test.ts` to verify DOM structure, Lit properties/events, and run automated accessibility checks (e.g., using `@open-wc/testing` with `axe`).
- [ ] **Visual Regression & E2E Testing:** Add a test case to the visual regression suite. Since Fractal serves components independently, use a free tool like **BackstopJS** or **Playwright** to capture screenshots directly from the component's Fractal preview URL (e.g., `/components/preview/<component-name>`). Verify keyboard navigation and focus states if applicable. Only run `--update-snapshots` after step 4 has confirmed the render is actually correct, so the baseline isn't a snapshot of a bug.

## 6. Documentation & Final Validation
- [ ] **Fractal Integration:** Create `<component-name>.config.json` and `<component-name>.hbs` for the visual documentation.
- [ ] **Validate Groundwork:** Ensure the component compiles, all tests pass, visual snapshots match expectations, and the schema accurately reflects the Lit properties.

## Known gotchas
- `packages/tokens/config.js`'s `css` platform must keep `prefix: "ct"` and the `ts` platform must keep emitting `tokens.d.ts` via `typescript/es6-declarations` — if either regresses, CSS vars silently fall back to browser defaults with no error (the `var(--ct-x, fallback)` pattern used in `_preview.hbs` masks it completely), or `tsc` fails on every `@ct-infra/tokens` import.
- If `/variables.css` or a token import 404s in the browser during Fractal preview, check both that `packages/tokens/dist/` was actually rebuilt *and* that `fractal.config.cjs`'s static mount for `../tokens/dist` is present — same symptom, two different causes, and the Fractal process needs a restart (not just a file edit) to pick up config changes.
