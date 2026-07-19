# Generative UI & AI Integration Plan

This document outlines the roadmap to make `ct-design-infra` fully capable of powering Generative UI and AI-driven development. It serves as context for LLM agents when tackling design system tasks.

## 🟢 Current Strengths (Ready for GenUI)

1. **W3C DTCG Tokens:** The tokens defined in `packages/tokens/src/tokens.json` use the W3C Design Tokens Community Group format (`$value`, `$type`). This standardization is perfect for RAG and AI tool consumption.
2. **Semantic Web Components:** The components are built using Lit (e.g., `<ct-grid>`) and expose simple, string-based attributes. LLMs are highly proficient at generating standard HTML strings with attributes, making them streamable directly to the DOM without complex wrappers.
3. **Accessibility Data:** The `wcag-data/` directory provides excellent structured data on accessibility requirements, which can be fed to agents to enforce compliance during generation.

## 🔴 Missing Groundwork (Action Items)

The following capabilities need to be implemented to enable safe and constrained Generative UI (e.g., via Vercel AI SDK or MCP).

### 1. Zod / JSON Schema Registry
**Problem:** LLMs need strict boundaries to generate valid props. Currently, prop types live only in Lit decorators and TypeScript, which cannot be natively passed as JSON Schema tools to an LLM.
**Action:** 
- Extract component APIs into Zod schemas (or standard JSON Schemas).
- Example: Create `packages/core/src/components/layout/grid/grid.schema.ts` defining `gap` as an enum of `"100" | "200" | "300" | "400"`.
- Export these schemas as a standalone package or utility that can be consumed by AI framework backends.

### 2. Machine-Readable Component Manifest
**Problem:** While Fractal configs (`region.config.json`) exist for documentation, there isn't a single index that an AI agent can read to understand the *entire* capability surface of the design system.
**Action:**
- Generate an AI-optimized `manifest.json` (or `registry.json`) during the build process.
- This manifest should map the custom element tag (e.g., `ct-grid`), a semantic description (when to use it), and point to its respective JSON schema. 

### 3. "Few-Shot" Example Corpora
**Problem:** LLMs struggle with component composition (e.g., placing items in a grid inside a region).
**Action:**
- Create a dedicated folder (e.g., `ai-examples/` or extending `wcag-data/`) containing raw HTML snippet compositions.
- These snippets must be designed specifically to be injected into system prompts as few-shot examples (e.g., "Example: Building a Dashboard Header").

### 4. Setup Model Context Protocol (MCP) Server
**Problem:** To bring this knowledge directly into the developer's IDE (Cursor, Claude Desktop), the data needs to be served.
**Action:**
- Build a lightweight MCP server package in the monorepo that exposes the Design Tokens, Component Manifest, Schemas, and Few-Shot Examples as queryable tools/resources for local agents.

## 📋 Component Addition Process

To ensure all new components are built with these GenUI capabilities from day one, follow the [New Component Addition Checklist](component-addition-checklist.md). When asking an AI to add a component, reference this checklist so the AI generates the Lit component, the Zod schema, the few-shot example, and updates the registry simultaneously.
