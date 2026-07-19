## ADR 0005: Resolve `@ct-infra/tokens` at Runtime via Import Maps, Not Bundling

Date: 2026-07-19

### Context

`packages/core` depends on `@ct-infra/tokens` for both CSS custom properties (`variables.css`) and JS token constants (`tokens.js`, consumed via `import { X } from '@ct-infra/tokens'`). The straightforward approach would be for Vite to bundle the tokens package directly into `dist/ct-core.js` like any other workspace dependency, so consumers get one self-contained file.

Instead, `@ct-infra/tokens` is explicitly listed in `rollupOptions.external` in `vite.config.ts`, and the Fractal preview environment resolves it via a browser-native `importmap` pointing at `/packages/tokens/dist/tokens.js` on disk (wired up in `fractal.config.cjs` / `_preview.hbs`).

### Decision

Design tokens are never bundled into `ct-core.js`. They are always resolved at runtime — via import maps in the browser (Fractal preview) or via the consumer's own module resolution in production — against the separately-published `@ct-infra/tokens` package.

### Rationale

- Tokens change independently of components (a color value can be corrected without touching any Lit class), so bundling them would force a full core rebuild/republish for a pure token change and would let component and token versions silently diverge inside a single compiled artifact.
- Keeping tokens external means a consuming application can override or swap the token package (e.g. a themed build, or a future multi-brand token set) without needing a custom build of `@ct-infra/core`.
- This mirrors how `variables.css` already works for styling (components reference `var(--ct-*)` and expect the consumer's page to load `variables.css` separately) — treating the JS token constants the same way keeps CSS and JS token consumption consistent instead of one being bundled and the other not.

### Consequences

- Every environment that loads `ct-core.js` must independently ensure `@ct-infra/tokens` resolves — in Fractal this is the `importmap` + the second static mount for `../tokens/dist`; in a real consuming app it means the tokens package must be an actual resolvable dependency, not just implied by core.
- If `tokens/dist/tokens.js` hasn't been built, or the static mount serving it is missing, `@ct-infra/tokens` imports 404 in the browser with no bundler-time error to catch it — this is a known sharp edge (see CLAUDE.md's Fractal wiring notes) and the two failure modes look identical from the browser console.
- `packages/core/tsconfig.json` must keep its path mapping pointed at `../tokens/dist/tokens.d.ts` for `tsc` to type-check token imports; because tokens are external, TypeScript has no other way to know their shape.
