## ADR 0002: Use Fractal for Component Library and Documentation

Date: 2026-05-09

### Context

As ct-design-infra scales, we need a dedicated environment to isolate, test, and document our framework-agnostic components. While tools like Storybook are industry standards, they often introduce significant complexity and framework-specific abstractions that can conflict with a pure Web Component/Lit-based architecture.

We explored several options, including Storybook (too heavy), Histoire (Vite-native but less mature for vanilla components), and Rocket (standards-based but primarily documentation-focused).

### Decision

We will use Fractal as our primary component library and documentation workbench, utilizing the Handlebars (.hbs) adapter for component templates.

### Rationale

- Fractal does not enforce a specific JavaScript framework on the components it hosts. This perfectly aligns with our goal of providing a framework-agnostic infrastructure.
- Fractal’s hierarchical organization (Components > Variants) reflects the "Atomic" nature of our layout system, making it easy to see how ct-grid and ct-grid-item interact.
- By choosing Handlebars, we keep the templating layer extremely thin. This ensures that the "intelligence" of the components remains within the Lit classes, while the Handlebars files serve only as simple wrappers for the browser to render.
- Fractal provides a clean "workbench" that allows us to verify components in total isolation, ensuring that our OKLCH tokens and fluid typography behave as expected without interference from global styles.

### Consequences

- Each component requires a .hbs template and a .config.json (or .js) file to be visible in the lab.
- Because Fractal is a CommonJS-based tool and our core is ESM, we must maintain a fractal.config.cjs and a custom runner script (lab.cjs) to bridge the environments.
- Fractal can be built into a static site (fractal build), which we can eventually deploy as our living style guide.
