# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`ct-design-infra` is a pnpm-workspace monorepo modernizing [CivicTheme](https://www.civictheme.io/) into a framework-agnostic, token-driven Web Component design system. It's built specifically to power **Generative UI**: components expose simple string/boolean attributes and (eventually) Zod schemas so LLMs can generate valid markup against strict boundaries. See `project-plan.md` for the GenUI roadmap and `docs/adr/` for the reasoning behind major technical choices (OKLCH color tokens, Fractal for docs).

## Commands

```bash
# Install
pnpm install

# Build design tokens (Style Dictionary) — must run before building/dev'ing core
pnpm build:tokens

# Build the core web components (tsc + vite build)
pnpm build:core

# Vite dev server for core components
pnpm dev:core

# Fractal component lab (docs/isolated preview environment)
pnpm build:tokens && pnpm --filter @ct-infra/core run fractal:start
# -> serves at http://localhost:3000, previews at /components/preview/<name>--<variant>

# Unit + accessibility tests (single component dir, via @open-wc/testing + web-test-runner)
pnpm --filter @ct-infra/core run test

# E2E / visual regression (Playwright, auto-boots the Fractal server on :3000)
pnpm exec playwright test
pnpm exec playwright test button.e2e.ts   # single spec
pnpm exec playwright test --update-snapshots  # re-baseline screenshots

# Scaffold a new component (generates .ts, .schema.ts, .hbs, .config.json, .test.ts, ai-example)
pnpm --filter @ct-infra/core run scaffold <category> <component-name>
# e.g. pnpm --filter @ct-infra/core run scaffold 01-atoms button

# Hybrid a11y audit (axe-core + Claude-as-judge) — see .claude/skills/sonnet-a11y-audit/SKILL.md
node .claude/skills/sonnet-a11y-audit/scripts/audit-component.mjs <component-name>
node .claude/skills/sonnet-a11y-audit/scripts/audit-page.mjs <url>
```

There is no top-level lint command configured yet.

All `dist/`/`build/` output (`packages/tokens/dist/`, `packages/core/dist/`, `packages/core/registry.json`) is gitignored generated output — regenerated locally and in CI by `pnpm build:tokens`/`build:core`. Don't commit it.

## Architecture

### Package layout

- `packages/tokens` — source of truth for design tokens (`src/global/*.json` for shared primitives — `color`, `spacing`, `breakpoint`, `typography`, `outline`, `stripe` — and `src/components/<name>.json` for component-scoped tokens, one file per component; W3C DTCG format: `$value`/`$type`, OKLCH color space). Style Dictionary (`config.js`) globs `src/**/*.json` and deep-merges every file, so this split is purely organizational — it exists so a new component's token file is a brand-new file rather than an edit to a shared one, which is what made parallel component-porting branches reliably conflict on merge (see `docs/parallel-porting.md`). Style Dictionary compiles the merged result to three files in `dist/`: `variables.css` (CSS custom properties, **all prefixed `--ct-*`** via the `prefix: "ct"` platform option — every consumer, from `_preview.hbs` to component `static styles`, assumes this prefix, so it must not be removed), `tokens.js` (an ES module of exported constants, consumed at runtime via a browser import map — the destination filename must stay `tokens.js`, not `tokens.ts`), and `tokens.d.ts` (generated via the `typescript/es6-declarations` format so `tsc` can type-check `import { X } from '@ct-infra/tokens'` in `packages/core`). `packages/core/tsconfig.json` maps `@ct-infra/tokens` to `../tokens/dist/tokens.d.ts` — if that mapping ever points at `tokens.ts` (which doesn't exist) `tsc` fails on every file that imports token constants.
- `packages/core` — Lit + TypeScript web components, bundled via Vite (`vite.config.ts`) into `dist/ct-core.js` (ESM) and `dist/ct-core.umd.cjs`. Also generates a Custom Elements Manifest via `vite-plugin-cem`.

`@ct-infra/tokens` is a workspace dependency of `@ct-infra/core` but is treated as an **external** in the Vite build (`rollupOptions.external`) — core never bundles tokens, it always resolves them at runtime (see Fractal wiring below).

The token set is not finished or closed — it only has what's been ported so far. Expect most new components to need new token entries: component-scoped ones (e.g. `button.border-radius`) go in a new `src/components/<name>.json`; shared ones (e.g. `color.interaction.*`) go into the relevant existing `src/global/<tier>.json`. Add them in DTCG format with the real CivicTheme values (see "Sourcing accurate values" below) rather than hardcoding a color/spacing number directly in a component.

### Component anatomy

Each component lives at `packages/core/src/components/<tier>/<name>/`, where `<tier>` mirrors CivicTheme's own atomic-design tiering from the `civictheme/uikit` source repo — `00-base`, `01-atoms`, `02-molecules`, `03-organisms`, `04-templates` — so a component's tier here always matches its tier in the upstream `packages/sdc/components/<tier>` it was ported from (see "Sourcing accurate values" below for the one documented exception: `00-base/icon` isn't its own CivicTheme component, it's a shared primitive consumed by several atoms/molecules). Each component directory is composed of parallel files, all generated together by `scripts/scaffold.js`:

- `<name>.ts` — the Lit `@customElement`, e.g. `CtButton` / `ct-button`. Properties are plain strings/booleans (no complex objects) so they map directly to HTML attributes an LLM can emit.
- `<name>.schema.ts` — a Zod schema mirroring the Lit properties, the strict boundary referenced in the GenUI plan for constraining AI-generated props.
- `<name>.hbs` — a thin Handlebars wrapper that renders the custom element for Fractal preview; all real logic stays in the Lit class.
- `<name>.config.json` — Fractal context/variants config (`title`, default `context`, and named `variants`, each becoming a preview URL like `button--secondary`).
- `<name>.test.ts` — unit + a11y test via `@open-wc/testing` (`fixture`, `expect(el).to.be.accessible()`), run by web-test-runner.
- `<name>.e2e.ts` — Playwright visual regression test that navigates to the component's Fractal preview URL and screenshots it.

`packages/core/src/index.ts` is generated by `scripts/build-index.mjs` from every non-schema/test/e2e `.ts` file under `src/components/` — gitignored and regenerated by `pnpm build`/`pnpm dev`/`pnpm scaffold`, never hand-edited or committed. (This used to be a hand-appended file, which meant every parallel component-porting branch touched the same trailing lines and reliably conflicted on merge — see `docs/parallel-porting.md`.) Follow `component-addition-checklist.md` end-to-end when porting a component from the original CivicTheme UI Kit — it also covers checking `wcag-data/<component>.json` for accessibility requirements and adding a composed usage snippet under `ai-examples/`.

Not every component is a single custom element. `02-molecules/accordion` is a parent+child pair — `ct-accordion` (owns all state and renders every panel's chrome) plus `ct-accordion-item` (a light-DOM child carrying just its own data, e.g. `heading`/`expanded`/`disabled`, slotted in as panel body). Use this shape for any component with repeatable child items (tabs, lists) instead of a JSON array prop — array/object props aren't allowed anyway (attributes stay plain strings/booleans). One `<name>.schema.ts` then exports one Zod schema per element. `scripts/scaffold.js` only generates the single-element shape; add the child element file(s) by hand following `accordion-item.ts`.

`packages/core/registry.json` is the machine-readable GenUI manifest `project-plan.md` calls for — generated by `scripts/build-registry.mjs` from `dist/custom-elements.json` as the last step of `pnpm --filter @ct-infra/core run build`. It maps every registered custom element tag to its JSDoc description, its Zod schema module/export (matched by convention: `ct-accordion-item` → `AccordionItemSchema`), and its attributes, and warns on any tag missing a schema. Gitignored, regenerated on every build — never hand-edit it or treat a diff to it as reviewable.

**`static styles` is the entire visual spec, not a placeholder.** Lit renders into a shadow root by default, so no external or global stylesheet — not `variables.css`, not anything else — ever applies to markup inside a component. The scaffold template's `static styles` block is deliberately bare; a component isn't done until that block contains the full real CSS (base rule, every variant class, every size class, light/dark theme combinations, and every interactive state: hover/active/focus-visible/disabled), all referencing `var(--ct-...)` tokens. Skipping this is the failure mode that shipped the Button component with zero visible styling — it type-checked and rendered markup fine, it just looked like an unstyled browser default because the CSS simply didn't exist anywhere.

**Sourcing accurate values:** the live https://uikit.civictheme.io/ Storybook is JS-rendered and can't be scraped for exact CSS. Instead pull straight from the `civictheme/uikit` GitHub repo (`raw.githubusercontent.com/civictheme/uikit/main/...`): the component's compiled CSS at `packages/sdc/components/<tier>/<name>/<name>.css` (tiers: `00-base`, `01-atoms`, `02-molecules`, `03-organisms`, `04-templates` — use the GitHub contents API if unsure which) gives the exact selectors and class structure, and `packages/sdc/dist/civictheme.variables.css` gives the exact resolved values for every `var(--ct-...)` the component CSS references. Copy values from there into the component's `packages/tokens/src/components/<name>.json` (or the relevant `src/global/<tier>.json` for a shared token), not approximations. This repo's own `packages/core/src/components/<tier>/` directories use these same five tier names, so the upstream tier you find a component under is also where it belongs here.

### Interactive state (Zag.js)

Most components are pure styling (Button). If a component genuinely needs a state machine — open/close, selection, multi-step — check whether CivicTheme's behavior implies one before assuming so, then reuse `packages/core/src/lib/zag/create-machine-service.ts` + `normalize-props.ts` (a ~150-line adapter that turns a Zag.js machine into a running service driving Lit's update cycle — Zag ships official bindings for React/Vue/Svelte/Solid but not Lit) and whichever `@zag-js/<name>` package matches the interaction pattern, rather than writing a new adapter or pulling in a different state library. `02-molecules/accordion` is the reference implementation. The adapter is generic (`MachineService<T extends MachineSchema>`) and meant to be imported read-only — never modified per-component.

### Fractal wiring (docs/preview environment)

Fractal is CommonJS-only while core is ESM, so the bridge is two files in `packages/core/`:

- `fractal.config.cjs` — configures the Handlebars engine, component path, and **static file mounts**. Fractal only serves one static root by default (`dist` → `/`); a second mount is added explicitly (`fractal.web.set("static", [...])`, an array of `{path, mount}`) to also serve `../tokens/dist` at `/packages/tokens/dist`, because `_preview.hbs`'s import map resolves `@ct-infra/tokens` to `/packages/tokens/dist/tokens.js`. If the tokens import 404s in the browser, check both that `tokens/dist/tokens.js` was actually built and that this static mount is present — the two failure modes look identical but need different fixes.
- `lab.cjs` — the actual server runner (`fractal.web.server({ sync: true }).start()`), invoked by the `fractal:start` script.
- `src/components/_preview.hbs` / `_layout.hbs` — the outer HTML shell for every component preview: sets up the browser-native `importmap` (Lit + `@ct-infra/tokens` resolved to on-disk paths, no bundler involved at preview time) and loads `/variables.css` and `/ct-core.js`.

Because the lab runs a long-lived Node process on ports 3000/3001, config changes to `fractal.config.cjs` or `lab.cjs` require killing and restarting that process to take effect — editing the file alone does not hot-reload the static-mount/server setup.

The port is configurable via `CT_FRACTAL_PORT` (read by `lab.cjs`, `scripts/verify-component.mjs`, and `playwright.config.ts`, falling back to 3000) — set it when more than one Fractal instance needs to run at once, e.g. one per git worktree when porting components in parallel (see `docs/parallel-porting.md`).

### Testing strategy

Two automated CI-tracked tiers, matching `packages/core/web-test-runner.config.mjs` and root `playwright.config.ts`, plus an on-demand hybrid audit for deeper accessibility review:

- **Unit/a11y** (`*.test.ts`): run in a real browser via `@web/test-runner` + Playwright-launched Chromium, using `@open-wc/testing` fixtures and its built-in axe accessibility assertions.
- **Visual/E2E** (`*.e2e.ts`): plain `@playwright/test`, configured at the workspace root (`testDir: packages/core/src/components`, `testMatch: '**/*.e2e.ts'`) so specs live next to the component but run against the built Fractal server. Playwright's `webServer` option auto-starts `fractal:start` on port 3000 if one isn't already running.
- **Hybrid a11y audit** (`.claude/skills/sonnet-a11y-audit/`): axe unit tests only catch structural violations — they can't judge WCAG success criteria that need context or vision (an ambiguous link's surrounding text, a focus ring that's present but too low-contrast to see, an icon that vanishes under forced-colors mode). This skill runs axe-core plus DOM/screenshot evidence-gathering via Playwright, then has Claude Code itself — already multimodal, already in the loop — judge the evidence against `references/wcag-rubrics.md`, no nested model API call needed. `audit-component.mjs` targets one component's Fractal preview; `audit-page.mjs` targets an arbitrary rendered page/URL (real or LLM-generated, `ct-*` or raw HTML) — see ADR 0008 and the skill's own `SKILL.md`. On-demand, not part of CI; use it when a component's accessibility needs closer review than the automated tiers give, or when auditing generated pages per `docs/ROADMAP.md`'s evaluation-suite plan.

## Coding conventions

- Components are built with Lit; adhere to W3C Design Token format and OKLCH for any new color tokens (see ADR 0001).
- All component schemas should map to the corresponding `wcag-data/<component>.json` structure to keep accessibility validation mechanical rather than ad hoc. `.claude/skills/sonnet-a11y-audit` can cross-check live findings against this file's `Conditional`/`Pass`/`Fail` entries — always confirm with the user before editing `wcag-data/<name>.json` from an audit's findings, it's a checked-in conformance claim, not scratch output.
- Keep Handlebars templates thin — they're a rendering shim for Fractal only; component behavior belongs in the Lit class, not the `.hbs` file.
- A component isn't verified until it's been visually checked, not just type-checked and unit-tested: build tokens + core, boot Fractal (`fractal:start`), and load each variant's preview URL. Tests passing proves markup/a11y structure, not that colors/spacing/fonts actually render — that requires looking (a screenshot, or reading `getComputedStyle` on the rendered shadow DOM via Playwright) and comparing against values sourced per "Sourcing accurate values" above.

## Project Status

See `docs/ROADMAP.md` for the current thesis research phase, active tasks, and timeline.
