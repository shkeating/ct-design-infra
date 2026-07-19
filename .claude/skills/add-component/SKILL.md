---
name: add-component
description: Port a CivicTheme UI Kit component into this repo's token-driven Lit web component system, end-to-end — reference lookup, token reconciliation, styling, and visual verification. Use when asked to add, build, port, or implement a new CivicTheme component (e.g. "add the card component", "build out the badge component", "port tag from CivicTheme").
---

# Add a CivicTheme component

This is the executable version of `component-addition-checklist.md`, tuned from what it actually took to get the Button component rendering correctly (it shipped once looking like an unstyled default browser button — type-checked fine, had zero real CSS). Follow the checklist file as the reference; this skill is the condensed how-to.

Ask the user for the category (`ui`, `layout`, or a new one) and the kebab-case component name if not given.

## 1. Pull the real spec from GitHub, not the live Storybook

https://uikit.civictheme.io/ is JS-rendered — it cannot be scraped for exact CSS. Always pull from `raw.githubusercontent.com/civictheme/uikit/main/...` instead:

- Compiled CSS: `packages/sdc/components/<tier>/<name>/<name>.css`, where tier is `01-atoms`, `02-molecules`, or `03-organisms`. If unsure which, list the tier directory via `curl -s https://api.github.com/repos/civictheme/uikit/contents/packages/sdc/components/<tier>`. This compiled file has already resolved all SCSS mixins into concrete selectors — use it, not the `.scss` source, which requires chasing mixin definitions across files.
- Prop schema: `<name>.component.yml` in the same directory — this is the source for the Zod schema in step 4.
- Resolved token values: `packages/sdc/dist/civictheme.variables.css`. Grep it for every `var(--ct-...)` name the compiled component CSS references to get the exact value.

## 2. Reconcile tokens

Diff every `var(--ct-...)` in the reference CSS against `packages/tokens/src/tokens.json`. Add anything missing in DTCG format (`$value`/`$type`) with the exact value from `civictheme.variables.css` — extend an existing category (`color`, `spacing`, `typography`) or add a new component-scoped key (e.g. `button`, `card`). Don't invent values.

Run `pnpm build:tokens`, then check `packages/tokens/dist/variables.css` for the expected `--ct-<path>` names before writing any component CSS against them.

## 3. Scaffold

`pnpm --filter @ct-infra/core run scaffold <category> <name>`

## 4. Implement the Lit component

- Props: plain strings/booleans only, mirroring `<name>.component.yml`.
- `static styles` is the **entire** visual spec — Shadow DOM blocks every external stylesheet from reaching this markup, so nothing renders unless it's written here. Port the reference CSS rule-for-rule: base rule, every variant class, every size class, light/dark theme combinations, and every interactive state (`:hover`, `:active`, `:focus-visible`, `[disabled]`). Reference tokens via `var(--ct-...)`; never hardcode a value that has a token.
- Match the reference's class shape (e.g. `.ct-<name>--<variant>.ct-theme-<theme>` as compound classes on one element) so ported selectors don't need restructuring.
- `<name>.schema.ts`: Zod schema mirroring the Lit properties.
- `ai-examples/<name>.html`: one realistic composed usage snippet.

## 5. Build and visually verify — do not skip

Passing types and passing unit tests prove markup and a11y structure, not that colors/spacing/fonts actually render. Only looking at it proves that.

Run `pnpm verify:component <name>` (`scripts/verify-component.mjs`). It rebuilds tokens + core (falling back to a bare `vite build` if `tsc` fails for an unrelated reason so it never blocks on that), reuses an already-running Fractal server on :3000 or boots and cleanly tears down its own, then for the default context and every variant in `<name>.config.json` screenshots the rendered element to `packages/core/.verify/<name>/<variant>.png` and prints a JSON report of `getComputedStyle` (background-color, color, padding, border-radius, border, font-family/size/weight, letter-spacing, opacity) for each.

Read the screenshots and diff the computed-style JSON against the values pulled from `civictheme.variables.css` in step 1. `packages/core/.verify/` is gitignored — it's scratch output, not a deliverable.

If the script itself needs changing (new computed-style properties worth checking, a different port, etc.), it's at `scripts/verify-component.mjs` — update it there rather than reverting to doing these steps by hand.

## 6. Tests

- `pnpm --filter @ct-infra/core run test` for `<name>.test.ts` (a11y + structure).
- `<name>.e2e.ts` Playwright visual regression — only run `pnpm exec playwright test <name>.e2e.ts --update-snapshots` after step 5 confirms the render is correct, so the baseline isn't a snapshot of a bug.

## Known gotchas

- `packages/tokens/config.js`'s `css` platform must keep `prefix: "ct"`, and the `ts` platform must keep emitting `tokens.d.ts` via `typescript/es6-declarations`. If either regresses: CSS vars silently fall back to browser defaults with no error (masked by the `var(--ct-x, fallback)` pattern in `_preview.hbs`), or `tsc` fails on every `@ct-infra/tokens` import.
- `packages/core/tsconfig.json` maps `@ct-infra/tokens` to `../tokens/dist/tokens.d.ts` — not `.ts`, which doesn't exist.
- If a token import 404s in the browser during Fractal preview, it's either that `packages/tokens/dist/` wasn't rebuilt, or that `fractal.config.cjs`'s static mount for `../tokens/dist` is missing — same symptom, different fixes. Fractal needs a process restart, not just a file edit, to pick up config changes.
- `_preview.hbs`/`_layout.hbs` only load Lexend + Public Sans (CivicTheme's two families). If a component needs another weight or family, add it there too.
