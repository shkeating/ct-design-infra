## ADR 0006: Shadow DOM as the Sole Styling Boundary

Date: 2026-07-19

### Context

Lit renders into a shadow root by default, meaning no external or global stylesheet — not `variables.css`, not a consuming page's own CSS — ever applies to markup inside a component. The alternative would be to disable shadow DOM (`createRenderRoot() { return this; }`) and rely on global CSS classes, closer to how the original CivicTheme SDC/Twig components and their compiled `civictheme.css` work.

This choice was made implicitly by adopting Lit's defaults, but its consequences weren't obvious until they were felt directly: the Button component type-checked, passed its unit/a11y tests, and rendered correct markup — but shipped with zero visible styling, because the scaffold's `static styles` block was left bare and nothing external could fill the gap.

### Decision

Components keep Lit's default shadow DOM encapsulation. Each component's `static styles` block must contain its entire visual spec — base rule, every variant/size class, light/dark theme combinations, and every interactive state (hover/active/focus-visible/disabled) — with no reliance on any styles leaking in from outside the shadow root.

### Rationale

- Shadow DOM encapsulation is what makes components safe to drop into arbitrary consuming pages (including GenUI-generated markup inserted into an unknown host page) without the component's appearance being at the mercy of whatever global CSS happens to be loaded.
- It removes an entire class of specificity/collision bugs (a consuming app's `.button` class can never accidentally restyle `ct-button`'s internals).
- Requiring the full visual spec to live in `static styles` makes a component's completeness mechanically checkable: if the block is bare, the component is unfinished, full stop — there's no ambiguity about "maybe the styles come from somewhere else."

### Consequences

- Type-checking and unit/a11y tests passing does **not** prove a component looks correct — this is now called out explicitly in CLAUDE.md's "Coding conventions": visual verification (screenshot or `getComputedStyle` via Playwright, per ADR 0007) is a required, separate step before a component is considered done.
- Every component re-declares tokens it needs via `var(--ct-*)` inside its own `static styles` rather than inheriting anything; this is intentional duplication in exchange for isolation, not an oversight to "clean up."
- Global concerns that legitimately want to cross the shadow boundary (e.g. CSS custom properties, which do pierce shadow DOM by design) remain the only sanctioned channel between the page and a component's internals — anything else (global classes, global element selectors) will silently do nothing.
