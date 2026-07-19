## ADR 0004: Use Zod for the GenUI Schema Boundary

Date: 2026-07-19

### Context

The core thesis of `ct-design-infra` is that constraining an LLM to a defined component API (props as a closed set of strings/enums/booleans) produces measurably fewer WCAG violations and structural hallucinations than letting it generate raw HTML/CSS. That constraint has to be expressed as something the LLM tooling can actually consume as a tool/function schema, not just as TypeScript types — TypeScript types are erased at compile time and can't be handed to an LLM API or validated against at runtime.

We considered plain JSON Schema authored by hand (works for LLM tool calling but drifts from the Lit component's actual prop types since nothing keeps them in sync), `io-ts` (strong runtime validation but a steeper functional-programming API and smaller ecosystem for JSON Schema export), and TypeScript's own type system alone (compile-time only, not usable as a runtime guardrail or an LLM-facing schema).

### Decision

Every component will have a `<name>.schema.ts` Zod schema mirroring its Lit `@property` definitions, per `component-addition-checklist.md`.

### Rationale

- Zod schemas are runtime-checkable, so generated markup can actually be validated against the schema (e.g. rejecting an invalid `variant` value) rather than just hoping the LLM got it right.
- Zod has first-class JSON Schema export, which is the format required for MCP tool definitions and most LLM function-calling APIs (see the planned MCP server in `project-plan.md`).
- Keeping the schema as a sibling file to the component (`<name>.ts` / `<name>.schema.ts`) makes the "strict boundary" explicit and reviewable per component, rather than inferred from scattered TypeScript types.
- Zod's `.enum()` / `.union()` primitives map directly onto the string/boolean-only prop philosophy already enforced for Lit components (see ADR 0003), so the schema and the component can't drift into representing incompatible shapes (e.g. the schema allowing an object where the component only accepts a string).

### Consequences

- Every new prop added to a component requires a matching manual update to its Zod schema — nothing currently generates one from the other, so they can drift if a contributor edits the Lit class without touching the schema file.
- The schema is currently a standalone file per component; until the "Machine-Readable Component Manifest" and MCP server (both open action items in `project-plan.md`) are built, nothing actually consumes these schemas at runtime yet — they exist ahead of their consumer.
- Zod is a runtime dependency of `@ct-infra/core` (not dev-only), so its bundle-size cost ships to every consumer even if they never touch the GenUI/validation path directly.
