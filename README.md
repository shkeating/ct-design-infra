# ct-design-infra

A framework-agnostic design system infrastructure modernizing [CivicTheme](https://www.civictheme.io/) for the modern web.

## Project Overview

`ct-design-infra` provides a robust, token-driven foundation for building accessible and performant digital experiences. By decoupling design logic from specific frameworks, this infrastructure ensures longevity and consistency across diverse tech stacks. This project is structured as a **pnpm workspace** monorepo.

## Key Technical Pillars

- Built with **Lit** and **TypeScript** for lightweight, standard-compliant Web Components that work in any environment (React, Astro, Vue, Angular, or vanilla JS/HTML).
- Centralized in **Style Dictionary**, encompassing color (utilizing OKLCH for perceptual uniformity), typography (_Public Sans_), spacing (8px base scale), and breakpoints (xxs to xxl).
- The monorepo seamlessly synchronizes design tokens with component implementations, exporting standard web components alongside a Custom Elements Manifest.
- Employs **Zod** to strictly define component schemas, providing robust boundaries for AI agents and Generative UI integration.

## Repository Structure

- `packages/tokens`: The source of truth for the system's design tokens. Processed via Style Dictionary to output framework-agnostic variables.
- `packages/core`: The implementation layer containing core layout components and UI primitives built with Lit, bundled via Vite.
- `docs/adr`: Architecture Decision Records (ADRs) tracking foundational design and technical choices.

## Core Components

The system currently includes fundamental layout primitives:

- **ct-region**: The primary vertical container for orchestrating rhythm and max-width constraints.
- **ct-grid**: A responsive 12-column CSS Grid container with tokenized gap support.
- **ct-grid-item**: A flexible grid child with responsive span controls across multiple tiers.

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
```

### Creating Components

To ensure all necessary files (Lit component, schemas, tests, Fractal configs, and AI examples) are generated correctly, use the built-in scaffolding tool.

```bash
# From the root, run the scaffold script in the core package:
pnpm --filter @ct-infra/core run scaffold <category> <component-name>

# Example:
pnpm --filter @ct-infra/core run scaffold ui button
```

This will automatically create a fully wired boilerplate based on the `component-addition-checklist.md`.

### Testing

The design system employs a two-tier testing strategy for all new components:
- **Unit & Accessibility:** We use `@open-wc/testing` and `@web/test-runner` to verify Lit properties, DOM structure, and run automated `axe` accessibility checks.
  ```bash
  pnpm --filter @ct-infra/core run test
  ```
- **Visual Regression & E2E:** `@playwright/test` is configured at the workspace root to perform end-to-end tests and capture visual snapshots directly from the isolated Fractal preview environments.
