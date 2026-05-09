# ct-design-infra

A framework-agnostic design system infrastructure modernizing CivicTheme for the modern web.

## Project Overview

`ct-design-infra` provides a robust, token-driven foundation for building accessible and performant digital experiences. By decoupling design logic from specific frameworks, this infrastructure ensures longevity and consistency across diverse tech stacks.

## Key Technical Pillars

- **Framework Agnostic:** Built with **Lit** for lightweight, standard-compliant Web Components that work in any environment (React, Astro, Vue, Angular, or vanilla JS/HTML).
- **Perceptual Color:** Utilizes **OKLCH** for all color tokens to ensure perceptual uniformity and alignment with the future **WCAG 3.0 APCA** contrast standards.
- **Fluid Foundations:** Implements a fluid typography and spacing engine using CSS `clamp()` logic, ensuring a seamless experience across all breakpoints.
- **Design as Infrastructure:** Managed via a monorepo structure to synchronize design tokens and component implementations.

## Repository Structure

- `packages/tokens`: The source of truth for the system. Contains Design Tokens (colors, spacing, breakpoints) processed via Style Dictionary.
- `packages/core`: The implementation layer. Contains core layout components and UI primitives built with Lit.

## Core Components

The system currently includes fundamental layout primitives:

- **ct-region**: The primary vertical container for orchestrating rhythm and max-width constraints.
- **ct-grid**: A responsive 12-column CSS Grid container with tokenized gap support.
- **ct-grid-item**: A flexible grid child with responsive span controls across multiple tiers (xxs to xl).

## Getting Started

### Prerequisites

- Node.js (Latest LTS)
- pnpm (Recommended for workspace management)

### Installation

```bash
pnpm install
```

### Development

To build tokens and start the component development environment:

```sh
# Build tokens
cd packages/tokens && npm run build

# Start core component dev
cd packages/core && npm run dev
```
