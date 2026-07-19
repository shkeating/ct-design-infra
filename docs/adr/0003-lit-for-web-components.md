## ADR 0003: Use Lit for Web Components

Date: 2026-07-19

### Context

`ct-design-infra` needs a framework-agnostic component layer: the output has to be consumable by any frontend (or by no frontend at all, when injected directly into the DOM by a GenUI pipeline) without requiring a React/Vue/Svelte runtime on the consuming side. That points toward native Custom Elements as the delivery mechanism, but authoring raw Custom Elements involves a lot of repetitive boilerplate (attribute/property reflection, reactive re-rendering, templating) that would slow down porting the ~30+ CivicTheme components and make the generated code harder for an LLM to pattern-match against.

We considered vanilla Custom Elements (maximum standards-compliance, but too much per-component boilerplate), Stencil (compiles to standards-based output but adds its own build/compiler layer and JSX-like templating), and FAST (Microsoft's web component library, smaller ecosystem, steeper learning curve for contributors).

### Decision

We will use Lit as the base class for all `ct-design-infra` components.

### Rationale

- Lit compiles down to standard Custom Elements with no required runtime framework on the consumer side — it stays true to the framework-agnostic goal.
- Its reactive property system maps cleanly onto plain string/boolean attributes, which is exactly the shape GenUI needs: an LLM can emit `<ct-button variant="primary" disabled>` without knowing anything about Lit internally.
- `static styles` plus Shadow DOM encapsulation (see ADR 0006) gives each component a self-contained visual spec, which keeps generated markup safe from consuming-page CSS collisions.
- Lit has a mature ecosystem (decorators, `@open-wc/testing` fixtures, `vite-plugin-cem` for Custom Elements Manifest generation) that the rest of the toolchain in this repo already depends on.

### Consequences

- Every component author needs to understand Lit's reactive update lifecycle (`willUpdate`, `updated`, property vs. attribute reflection) even though the public-facing API is "just HTML attributes."
- Lit's decorator syntax (`@customElement`, `@property`) requires TypeScript's `experimentalDecorators`/`useDefineForClassFields` configuration to stay correct — a source of subtle breakage if the `tsconfig.json` settings drift.
- Because Lit renders into a shadow root, no global stylesheet ever reaches component markup; this is a deliberate constraint (see ADR 0006) but means every new component must carry its own complete CSS rather than relying on inherited styles.
