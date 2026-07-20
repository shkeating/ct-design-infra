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
- Accessibility requirements: `wcag-data/<name>.json`. Not every CivicTheme component has one (checked against `wcag-data/`, not upstream). **If it's missing, write it — don't skip it, and don't shallow-copy the nearest analog's file wholesale.** Pick any existing file as the structural template (same ~55 standards, same order — `wcag-data/form.json` is a good one to diff a new file's `standard` list against to confirm you matched it exactly), cross-reference genuinely related existing files for the generic guidance that legitimately carries over (a form-control-adjacent atom should look at `wcag-data/form.json` and `wcag-data/search.json`), but write `observations` specific to *this* component's actual behavior for whichever standards actually turn on it — don't reuse another component's prose just because the outcome/standard number matches. `wcag-data/label.json` is the worked example: it marks 1.3.1/4.1.2 Conditional on the `for`/`id` programmatic association (which the label component can't enforce itself since it doesn't render the associated control), 2.5.3 on the accessible name containing the visible label text, 2.4.6/3.2.4 on label text quality/consistency, and marks 3.3.2 a genuine **Pass** (providing the label text is the component's entire purpose) rather than reflexively marking everything Conditional the way a shallow copy would.
- Demo/preview media (a photo for `image`, a wordmark for `logo`, a background for `banner`, etc.): **don't invent a placeholder just because the obvious path 404s.** `<name>.stories.js`'s `args` often reference a demo asset by a path like `./demo/images/demo5.jpg` — that path is relative to Storybook's static serving, not to the component's own directory, so appending it to `raw.githubusercontent.com/.../components/<tier>/<name>/` will 404 even though the asset is real. Check these two locations (via the GitHub contents API, same as tier discovery) before falling back to a fabricated placeholder:
  - `packages/sdc/.storybook/static/demo/...` — generic demo photos referenced directly by relative path in a `.stories.js`'s `args` (this is where `demo5.jpg` actually lives).
  - `packages/sdc/dist/assets/...` — logos, backgrounds, and similar branded assets, whose paths are resolved indirectly through `packages/sdc/dist/constants.json` (its `LOGOS`/`BACKGROUNDS` maps) rather than hardcoded in the story file; a `.stories.data.js` importing `Constants` from that file is the tell that this is where to look.
  A single 404 on the naive path is not proof the asset doesn't exist upstream. Once found, embed it as a base64 `data:` URI in `<name>.config.json` (and, if used, `ai-examples/<name>.html`) — same no-external-network-dependency convention as everything else in the Fractal preview, just with the real asset instead of an invented box.

## 2. Reconcile tokens

Diff every `var(--ct-...)` in the reference CSS against `packages/tokens/src/global/*.json` and `packages/tokens/src/components/*.json`. Add anything missing in DTCG format (`$value`/`$type`) with the exact value from `civictheme.variables.css`. Don't invent values. Two kinds of additions, treated differently:

- **Component-scoped** (the common case): create a new file `packages/tokens/src/components/<name>.json` containing just `{ "<name>": { ... } }`. Style Dictionary's `source: ["src/**/*.json"]` glob deep-merges every file in the tree, so this is a brand-new file, not an edit to a shared one — the zero-conflict shape, which matters when components are ported in parallel (see "Parallel porting" below). Never add a component's tokens back into an existing shared file.
  - If the reference CSS you're porting fully embeds the generic styling for a *different*, not-yet-ported component (e.g. `basic-content`'s compiled CSS includes complete table styling even though no `ct-table` exists yet), it's fine to create that component's own token namespace now (`packages/tokens/src/components/table.json`) rather than folding those values into the current component's file — name it after the component the styles actually belong to, document why in a comment/commit note, and whoever ports that component later reconciles against real tokens instead of starting from nothing.
- **Shared theme-role/typography** — when the reference CSS needs a `--ct-color-light-*`/`--ct-color-dark-*`/`--ct-typography-*` variable that doesn't exist yet (theme primitives like body/heading/background colors, or a heading size in the type scale). Add it directly into the existing `color`/`typography` object in `packages/tokens/src/global/color.json` / `global/typography.json`, named after the CivicTheme variable — see `ui/accordion`'s original `tokens.json` diff (predates the split, but still the reference example of both tiers done correctly). **Check whether the key already exists first** — as more components land, most of what a new component needs is already there. Unlike the component-scoped case, this does still touch a file shared across parallel branches — see `docs/parallel-porting.md`.

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

A variant that's supposed to demonstrate a numeric/dimensional prop (width/height, a size variant, an explicit dimension) needs a value that's actually visibly different from whatever the default context already uses — not just structurally different in `<name>.config.json`. `verify:component` will report a pass either way since it only checks that the page rendered without error; a `sized` variant that happens to reuse the default's own dimensions produces a screenshot pixel-identical to `default`, silently proving nothing. Pick a value the screenshot itself makes obvious.

If the script itself needs changing (new computed-style properties worth checking, a different port, etc.), it's at `scripts/verify-component.mjs` — update it there rather than reverting to doing these steps by hand.

## 6. Tests

- `pnpm --filter @ct-infra/core run test` for `<name>.test.ts` (a11y + structure).
- `<name>.e2e.ts` Playwright visual regression — write it once step 5 confirms the render is correct, so the baseline isn't a snapshot of a bug. A local `pnpm exec playwright test <name>.e2e.ts --update-snapshots` run is fine as a quick sanity check, but see below before treating anything it produces as a real baseline.

### Check whether other components render this one

If `<name>` is (or could be) composed inside another component's shadow DOM — a shared primitive like `icon`, used internally by `button`/`link`/`tag` — grep for existing usages before you're done:

```
grep -rl "ct-<name>" packages/core/src/components --include=*.ts | grep -v "/<name>/"
```

For every match, check whether that consumer's own `.config.json` variants that its `.e2e.ts` spec actually screenshots would now render `<name>` with a visible value (e.g. does the tested variant set an `icon` prop?). If a tested variant's context doesn't touch this component, its baseline is unaffected — no action needed. If it does, that consumer's baseline needs regenerating in this same PR, using the same process below.

### Baselines must come from CI, not your machine

`toHaveScreenshot()` is OS-render-sensitive. A local `--update-snapshots` run on macOS writes `-chromium-darwin.png` files — CI never reads these, and they must never be committed (nothing in `.gitignore` filters them out, so check `git status` before staging and leave them untracked). The `-chromium-linux.png` files CI actually compares against can only be generated correctly by CI itself:

1. `gh workflow run ci.yml --ref <branch> -f update_snapshots=true`
2. Find the run once it starts: `gh run list --workflow=ci.yml --branch=<branch> --limit 1`, then wait on it (poll `gh run view <run-id> --json status` or just `gh run watch <run-id>`).
3. Download the regenerated snapshots: `gh run download <run-id> -n playwright-snapshots -D <tmp-dir>`. The artifact contains the whole repo's snapshot tree (`packages/core/src/components/**/*.e2e.ts-snapshots/**`), not just yours — copy in only `<tmp-dir>/ui/<name>/<name>.e2e.ts-snapshots/*`, plus any consumer directories flagged below. Don't bulk-copy the artifact's full tree over the repo.
4. **Review before committing — this is the actual review step, not a rubber stamp** (see `docs/adr/0007-playwright-for-visual-regression.md`'s Consequences). `cmp` every `*-chromium-linux.png` in the artifact against what's already committed at the same path. Anything byte-identical needs no action — that confirms unrelated components weren't affected. Anything new or changed, actually look at it (the Read tool renders PNGs directly) and confirm it matches the intended change before copying it into the repo and `git add`ing it. Never bulk-copy the whole artifact over the existing snapshot tree unreviewed.
5. Do this for `<name>`'s own new baselines *and* for any consumer baselines flagged by the composition check above, together in the same PR — a component and the fallout of it being embedded elsewhere should land as one reviewable change, not a follow-up someone has to notice is missing.

## Parallel porting

When run as a background agent in its own git worktree (no one available to answer clarifying questions) rather than an interactive session, follow these fallbacks instead of stopping:

- Ambiguous tier/category → best guess from the GitHub contents API, flagged prominently in your final summary rather than blocking.
- A resolved value that can't be found in `civictheme.variables.css` → use the literal from the compiled CSS directly, flagged as "no matching token found" — never invent a plausible-looking value.
- `pnpm verify:component` shows a visual mismatch → fix it, re-run, and stop after 2 attempts if it still doesn't match — report the exact diff instead of iterating indefinitely.
- `pnpm verify:component`/`fractal:start` return zero components, or every preview 404s, with no other error → this used to happen for every worktree-based agent (see "Known gotchas" below); `lab.cjs` now works around it automatically, so if you still see it, something else is wrong — don't re-invent the workaround, investigate `lab.cjs`'s mirror step instead.
- New npm dependency needed → check `packages/core/package.json` first for something already covering it (see the Zag adapter note above); if genuinely new, add it and run `pnpm install`, and expect `pnpm-lock.yaml`'s diff to need a one-at-a-time merge against other parallel branches, same as the shared-tier token additions above.
- No `wcag-data/<name>.json` upstream → this is not a reason to skip it, and "flag it as needing human review" is not a substitute for writing it. Write one per step 1's guidance (structural template + cross-referenced related files + component-specific observations) in the same PR. A batch of 5 agents once handled this three different ways (two skipped it and just flagged the gap, one shallow-copied an unrelated component's file) — none of those are the bar; `wcag-data/label.json` is.

See `docs/parallel-porting.md` for how a batch of these agents gets launched, reviewed, and merged.

## Known gotchas

- `packages/tokens/config.js`'s `css` platform must keep `prefix: "ct"`, and the `ts` platform must keep emitting `tokens.d.ts` via `typescript/es6-declarations`. If either regresses: CSS vars silently fall back to browser defaults with no error (masked by the `var(--ct-x, fallback)` pattern in `_preview.hbs`), or `tsc` fails on every `@ct-infra/tokens` import.
- `packages/core/tsconfig.json` maps `@ct-infra/tokens` to `../tokens/dist/tokens.d.ts` — not `.ts`, which doesn't exist.
- If a token import 404s in the browser during Fractal preview, it's either that `packages/tokens/dist/` wasn't rebuilt, or that `fractal.config.cjs`'s static mount for `../tokens/dist` is missing — same symptom, different fixes. Fractal needs a process restart, not just a file edit, to pick up config changes.
- `@frctl/core`'s component-discovery filter substring-matches the *entire absolute path* against a "hidden file" regex instead of checking individual path segments, so it silently discovers zero components whenever `packages/core` sits under any dot-prefixed ancestor directory — which is exactly where agent worktrees live (`.claude/worktrees/<id>/`, see `docs/parallel-porting.md`). `lab.cjs` detects this and transparently mirrors the files Fractal scans (component sources, built `dist/`, tokens `dist/`) to a dot-free tmp directory before starting the server, so `fractal:start`/`verify:component` work normally even from inside a worktree — no manual workaround needed. If you're debugging a *different* Fractal discovery issue, know that this mirroring step exists so you don't mistake mirrored-tmp-dir paths in logs for a misconfiguration.
- `_preview.hbs`/`_layout.hbs` only load Lexend + Public Sans (CivicTheme's two families). If a component needs another weight or family, add it there too.
- Playwright visual baselines are OS-render-sensitive: a local `--update-snapshots` run only ever produces `-darwin.png` files, which CI ignores and which should never be committed. Real baselines (`-linux.png`) only come from the `ci.yml` workflow's `update_snapshots` workflow_dispatch input — see "Baselines must come from CI, not your machine" in step 6. This applies just as much to a component you're modifying as one you're adding — if it changes what any other component renders (see "Check whether other components render this one" in step 6), that consumer's baseline needs the same treatment.
