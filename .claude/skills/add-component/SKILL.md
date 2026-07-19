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

Diff every `var(--ct-...)` in the reference CSS against `packages/tokens/src/tokens.json`. Add anything missing in DTCG format (`$value`/`$type`) with the exact value from `civictheme.variables.css`. Don't invent values. Two kinds of additions, treated differently:

- **Component-scoped** (the common case): a new top-level key matching the component's kebab-case name (`button`, `stripe`, `accordion` all do this already), inserted immediately before the file's final closing brace. This is the low-conflict shape — every component's diff lands in its own non-overlapping region, which matters when components are ported in parallel (see "Parallel porting" below).
- **Shared theme-role/typography** — when the reference CSS needs a `--ct-color-light-*`/`--ct-color-dark-*`/`--ct-typography-*` variable that doesn't exist yet (theme primitives like body/heading/background colors, or a heading size in the type scale). Add it directly into the existing `color.light`/`color.dark`/`typography.*` object, named after the CivicTheme variable — see `ui/accordion`'s `tokens.json` diff for the reference example of both tiers done correctly. **Check whether the key already exists first** — as more components land, most of what a new component needs is already there.

Run `pnpm build:tokens`, then check `packages/tokens/dist/variables.css` for the expected `--ct-<path>` names before writing any component CSS against them.

## 3. Scaffold

`pnpm --filter @ct-infra/core run scaffold <category> <name>`

## 4. Implement the Lit component

- Props: plain strings/booleans only, mirroring `<name>.component.yml`.
- `static styles` is the **entire** visual spec — Shadow DOM blocks every external stylesheet from reaching this markup, so nothing renders unless it's written here. Port the reference CSS rule-for-rule: base rule, every variant class, every size class, light/dark theme combinations, and every interactive state (`:hover`, `:active`, `:focus-visible`, `[disabled]`). Reference tokens via `var(--ct-...)`; never hardcode a value that has a token.
- Match the reference's class shape (e.g. `.ct-<name>--<variant>.ct-theme-<theme>` as compound classes on one element) so ported selectors don't need restructuring.
- **Interactive state (open/close, selection, multi-step)?** Don't assume it — most components are pure styling, like Button. If the CivicTheme behavior genuinely needs a state machine (accordion-style expand/collapse, tabs, a combobox), check whether `@zag-js/<name>` exists upstream, and reuse `packages/core/src/lib/zag/create-machine-service.ts` + `normalize-props.ts` (the Lit adapter for Zag, since Zag ships official bindings for React/Vue/Svelte/Solid but not Lit) rather than writing a new adapter. See `ui/accordion` for the reference pattern. Adding a new dependency for this? Check `packages/core/package.json` first — `@zag-js/core`/`@zag-js/types`/`@zag-js/utils` plus whichever `@zag-js/<name>` package are usually already there.
- **Repeatable child items (accordion panels, tabs, list items)?** Consider a parent+child element pair rather than a single element with a JSON array prop — array/object props aren't allowed anyway (plain strings/booleans only). `ui/accordion`'s `ct-accordion` (owns the machine, renders all chrome) + `ct-accordion-item` (light-DOM child carrying just its own data, slotted in as panel body) is the reference example. `scaffold.js` only generates the single-element shape; add the child element file(s) by hand following that pattern.
- `<name>.schema.ts`: Zod schema mirroring the Lit properties. For a composite component, export one schema per element (see `accordion.schema.ts`'s `AccordionSchema` + `AccordionItemSchema`).
- `ai-examples/<name>.html`: one realistic composed usage snippet.
- Don't hand-edit any manifest/registry file — `packages/core/registry.json` is generated by `scripts/build-registry.mjs` from `dist/custom-elements.json` as part of `pnpm build:core`. Nothing to do here beyond giving the component class a real JSDoc description (already scaffolded) — that's what becomes the registry's `description` field.

## 5. Build and visually verify — do not skip

Passing types and passing unit tests prove markup and a11y structure, not that colors/spacing/fonts actually render. Only looking at it proves that.

Run `pnpm verify:component <name>` (`scripts/verify-component.mjs`). It rebuilds tokens + core (falling back to a bare `vite build` if `tsc` fails for an unrelated reason so it never blocks on that), reuses an already-running Fractal server on :3000 or boots and cleanly tears down its own, then for the default context and every variant in `<name>.config.json` screenshots the rendered element to `packages/core/.verify/<name>/<variant>.png` and prints a JSON report of `getComputedStyle` (background-color, color, padding, border-radius, border, font-family/size/weight, letter-spacing, opacity) for each.

Read the screenshots and diff the computed-style JSON against the values pulled from `civictheme.variables.css` in step 1. `packages/core/.verify/` is gitignored — it's scratch output, not a deliverable.

If the script itself needs changing (new computed-style properties worth checking, a different port, etc.), it's at `scripts/verify-component.mjs` — update it there rather than reverting to doing these steps by hand.

## 6. Tests

- `pnpm --filter @ct-infra/core run test` for `<name>.test.ts` (a11y + structure).
- `<name>.e2e.ts` Playwright visual regression — only run `pnpm exec playwright test <name>.e2e.ts --update-snapshots` after step 5 confirms the render is correct, so the baseline isn't a snapshot of a bug.

## Parallel porting

When run as a background agent in its own git worktree (no one available to answer clarifying questions) rather than an interactive session, follow these fallbacks instead of stopping:

- Ambiguous tier/category → best guess from the GitHub contents API, flagged prominently in your final summary rather than blocking.
- A resolved value that can't be found in `civictheme.variables.css` → use the literal from the compiled CSS directly, flagged as "no matching token found" — never invent a plausible-looking value.
- `pnpm verify:component` shows a visual mismatch → fix it, re-run, and stop after 2 attempts if it still doesn't match — report the exact diff instead of iterating indefinitely.
- New npm dependency needed → check `packages/core/package.json` first for something already covering it (see the Zag adapter note above); if genuinely new, add it and run `pnpm install`, and expect `pnpm-lock.yaml`'s diff to need a one-at-a-time merge against other parallel branches, same as the shared-tier token additions above.

See `docs/parallel-porting.md` for how a batch of these agents gets launched, reviewed, and merged.

## Known gotchas

- `packages/tokens/config.js`'s `css` platform must keep `prefix: "ct"`, and the `ts` platform must keep emitting `tokens.d.ts` via `typescript/es6-declarations`. If either regresses: CSS vars silently fall back to browser defaults with no error (masked by the `var(--ct-x, fallback)` pattern in `_preview.hbs`), or `tsc` fails on every `@ct-infra/tokens` import.
- `packages/core/tsconfig.json` maps `@ct-infra/tokens` to `../tokens/dist/tokens.d.ts` — not `.ts`, which doesn't exist.
- If a token import 404s in the browser during Fractal preview, it's either that `packages/tokens/dist/` wasn't rebuilt, or that `fractal.config.cjs`'s static mount for `../tokens/dist` is missing — same symptom, different fixes. Fractal needs a process restart, not just a file edit, to pick up config changes.
- `_preview.hbs`/`_layout.hbs` only load Lexend + Public Sans (CivicTheme's two families). If a component needs another weight or family, add it there too.
