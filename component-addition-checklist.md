# New Component Addition Checklist

This checklist outlines the repeatable process for porting a component from the original CivicTheme UI Kit into this modern, Generative UI-ready Web Component design system. 

When you want to bring in a new component, provide the AI with this checklist so all required files (source, schemas, examples) are generated in one go.

## 1. Research & Reference
- [ ] **Find Original Reference:** Locate the component in the [CivicTheme UI Kit repository](https://github.com/civictheme/uikit/tree/main/packages/sdc/components) or the [CivicTheme Docs](https://docs.civictheme.io/). (Note: GitBook provides an MCP server, which can be hooked up to your local AI to ingest this documentation directly).
- [ ] **Analyze Structure:** Understand the HTML structure, CSS properties, and modifiers used in the original implementation.
- [ ] **Review WCAG Data:** Check the corresponding `wcag-data/<component>.json` file (or create it if missing) to understand the accessibility requirements.

## 2. Component Implementation (Lit)
- [ ] **Create Directory:** `packages/core/src/components/<category>/<component-name>/`
- [ ] **Create Web Component:** Implement the `<ct-[name]>` in `<component-name>.ts` using Lit.
  - Expose the API using simple string/boolean attributes (`@property({ type: String })`).
  - Integrate design tokens from `tokens.json` (using CSS variables like `var(--ct-spacing-...)`).
  - Ensure semantic HTML, `role` attributes, and `aria-*` attributes satisfy the WCAG requirements.

## 3. Generative UI Groundwork
- [ ] **Create Zod Schema:** Create `<component-name>.schema.ts` defining the exact props, types, and accepted enums for the component. This creates the strict boundaries for AI generation.
- [ ] **Update Manifest/Registry:** Add the component to the central machine-readable manifest (e.g. `registry.json`) mapping the tag name to its schema and semantic description.
- [ ] **Add Few-Shot Examples:** Create a snippet in `ai-examples/<component-name>.html` with composed HTML demonstrating how to use the component.

## 4. Testing & Quality Assurance
- [ ] **Unit & Accessibility Testing:** Create `<component-name>.test.ts` to verify DOM structure, Lit properties/events, and run automated accessibility checks (e.g., using `@open-wc/testing` with `axe`).
- [ ] **Visual Regression & E2E Testing:** Add a test case to the visual regression suite. Since Fractal serves components independently, use a free tool like **BackstopJS** or **Playwright** to capture screenshots directly from the component's Fractal preview URL (e.g., `/components/preview/<component-name>`). Verify keyboard navigation and focus states if applicable.

## 5. Documentation & Final Validation
- [ ] **Fractal Integration:** Create `<component-name>.config.json` and `<component-name>.hbs` for the visual documentation.
- [ ] **Validate Groundwork:** Ensure the component compiles, all tests pass, visual snapshots match expectations, and the schema accurately reflects the Lit properties.
