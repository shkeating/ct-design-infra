# ct-design-infra

A framework-agnostic design system infrastructure modernizing [CivicTheme](https://www.civictheme.io/) for the modern web.

## Project Overview

`ct-design-infra` provides a robust, token-driven foundation for building accessible and performant digital experiences. By decoupling design logic from specific frameworks, this infrastructure ensures longevity and consistency across diverse tech stacks. This project is structured as a **pnpm workspace** monorepo.

## Key Technical Pillars

- Built with **Lit** and **TypeScript** for lightweight, standard-compliant Web Components that work in any environment (React, Astro, Vue, Angular, or vanilla JS/HTML).
- Centralized in **Style Dictionary**, encompassing color (utilizing OKLCH for perceptual uniformity), typography (_Public Sans_ and _Lexend_), spacing (8px base scale), and breakpoints (xxs to xxl).
- The monorepo seamlessly synchronizes design tokens with component implementations, exporting standard web components alongside a Custom Elements Manifest.
- Employs **Zod** to strictly define component schemas, providing robust boundaries for AI agents and Generative UI integration. `packages/core/registry.json` (generated at build time from the Custom Elements Manifest, never hand-maintained) is the single machine-readable index mapping every tag to its schema, description, and attributes.
- Interactive components (expand/collapse, selection, multi-step state) are driven by **Zag.js** state machines via a small hand-rolled Lit adapter (`packages/core/src/lib/zag/`), since Zag ships official bindings for React/Vue/Svelte/Solid but not Lit.

## Repository Structure

- `packages/tokens`: The source of truth for the system's design tokens. Processed via Style Dictionary to output framework-agnostic variables.
- `packages/core`: The implementation layer containing core layout components and UI primitives built with Lit, bundled via Vite. Also home to `registry.json` (generated GenUI manifest), `scripts/scaffold.js` (new component boilerplate), and `scripts/build-registry.mjs`.
- `wcag-data/`: One JSON file per CivicTheme component, pre-populated with the applicable WCAG success criteria — the master list of what's left to port, and the accessibility spec each port must satisfy.
- `ai-examples/`: Realistic composed HTML snippets per component, meant to be injected into system prompts as few-shot examples.
- `docs/adr`: Architecture Decision Records (ADRs) tracking foundational design and technical choices.
- `docs/parallel-porting.md`: How to port several components at once using multiple Claude Code agents in isolated git worktrees.
- `component-addition-checklist.md` / `.claude/skills/add-component/SKILL.md`: the step-by-step (and AI-executable) process for porting one CivicTheme component into this repo.
- `PORTING_STATUS.json`: hand-maintained tracker of which components are done, in progress, or not started — check this before claiming a component to port.

## Core Components

Organized by the same atomic-design tiers CivicTheme itself uses. See `PORTING_STATUS.json` for the authoritative status of each component and `wcag-data/` for the full CivicTheme roster not yet started.

**00-base**
- **ct-icon**: Shared SVG icon primitive — not a CivicTheme component in its own right, but consumed by several atoms/molecules (button, link, tag, field-message) for their icon props.
- **ct-item-list**: A list primitive with tokenized gap/orientation for grouping repeatable content.
- **ct-region**: The primary vertical container for orchestrating rhythm and max-width constraints.
- **ct-grid** / **ct-grid-item**: A responsive 12-column CSS Grid container and flexible child with tokenized gap/span support.

`ct-region`/`ct-grid`/`ct-grid-item` predate the current scaffold-based process (no Zod schema, unit tests, or e2e coverage yet — "legacy-partial" in `PORTING_STATUS.json`).

**01-atoms**
- **ct-button**: All CivicTheme button variants/sizes/themes, plus link (`<a>`) and native `<input>` rendering modes via a `kind` attribute.
- **ct-tag**, **ct-link**, **ct-heading**, **ct-label**, **ct-content-link**, **ct-field-message**, **ct-chip**, **ct-image**, **ct-table**, **ct-video**, **ct-paragraph**: Fully scaffold-conformant (schema, unit/a11y tests, e2e visual regression).

**02-molecules**
- **ct-accordion** / **ct-accordion-item**: Expand/collapse panels driven by a Zag.js state machine (keyboard navigation, `aria-expanded`/`aria-controls` wiring). Panels are composed as `ct-accordion-item` light-DOM children rather than a JSON prop — the reference example for any future component with repeatable child items.
- **ct-logo**, **ct-breadcrumb** / **ct-breadcrumb-item**, **ct-basic-content**, **ct-attachment** / **ct-attachment-file**, **ct-tooltip**, **ct-callout**, **ct-next-steps**, **ct-social-links**: Fully scaffold-conformant.

**03-organisms**
- **ct-alert**: Dismissible, typed (information/warning/error/success) alert banner; composes `ct-button` and `ct-icon`.

`ct-button` and `ct-accordion` are the fully-conformant reference implementations. See `PORTING_STATUS.json` for components currently in review (open PRs) ahead of the next merge.

## Documentation & Component Lab

We use **Fractal** to document our components and test them in isolation. Components are built with Lit, but documented via Handlebars (`.hbs`) templates to maintain framework-agnosticism.

## Getting Started

### Prerequisites

- Node.js (Latest LTS)
- [pnpm](https://pnpm.io/) (Required for workspace management)

### Installation

```bash
pnpm install
```

### Build & Development

The repository includes convenient root-level scripts for building and development:

```bash
# 1. Build the design tokens (Style Dictionary)
pnpm build:tokens

# 2. Build the core web components
pnpm build:core

# 3. Start the Lit development server (Vite) for core components
pnpm dev:core
```

### Component Lab

To view the library and documentation UI in Fractal:

```bash
# Ensure tokens are built first
pnpm build:tokens

# Run the Fractal server from the core package
pnpm --filter @ct-infra/core run fractal:start
# -> serves at http://localhost:3000, previews at /components/preview/<name>--<variant>
```

Set `CT_FRACTAL_PORT` to run on a different port — e.g. so a second checkout or git worktree can run its own Fractal instance without colliding with one already running on :3000:

```bash
CT_FRACTAL_PORT=3010 pnpm --filter @ct-infra/core run fractal:start
```

### Creating Components

To ensure all necessary files (Lit component, schemas, tests, Fractal configs, and AI examples) are generated correctly, use the built-in scaffolding tool, then follow [component-addition-checklist.md](component-addition-checklist.md) (or its AI-executable form, `.claude/skills/add-component/SKILL.md`) end-to-end.

```bash
# From the root, run the scaffold script in the core package:
pnpm --filter @ct-infra/core run scaffold <tier> <component-name>
# <tier> mirrors CivicTheme's own atomic-design tiers: 00-base, 01-atoms,
# 02-molecules, 03-organisms, 04-templates

# Example:
pnpm --filter @ct-infra/core run scaffold 01-atoms button
```

Before considering a component done, visually verify it — passing types and unit tests only prove markup/a11y structure, not that the CSS you wrote actually renders (this is how Button originally shipped looking like an unstyled default browser button):

```bash
pnpm verify:component <tier>/<name>
# e.g. pnpm verify:component 01-atoms/button
```

This rebuilds tokens + core, boots (or reuses) a Fractal server, and screenshots every variant to `packages/core/.verify/<name>/*.png` alongside a `getComputedStyle` report to diff against the reference CSS — open the screenshots and look.

### Testing

The design system employs a two-tier testing strategy for all new components:
- **Unit & Accessibility:** We use `@open-wc/testing` and `@web/test-runner` to verify Lit properties, DOM structure, and run automated `axe` accessibility checks.
  ```bash
  pnpm --filter @ct-infra/core run test
  ```
- **Visual Regression & E2E:** `@playwright/test` is configured at the workspace root to perform end-to-end tests and capture visual snapshots directly from the isolated Fractal preview environments. Only re-baseline (`--update-snapshots`) after `pnpm verify:component` has confirmed the render is actually correct.

### Porting components at scale

CivicTheme has dozens of components; `wcag-data/` lists all of them and `PORTING_STATUS.json` tracks progress. To port several at once, launch multiple Claude Code agents in parallel, each in its own isolated git worktree — see [docs/parallel-porting.md](docs/parallel-porting.md) for the batch-launch/review/merge workflow and the self-contained agent prompt template.
