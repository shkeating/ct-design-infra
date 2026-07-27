// wcag-data/icon.json has no enforced tests in this tier — documenting why,
// per this branch's convention of saying so explicitly rather than silently
// skipping a component (see tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// icon.json is the same boilerplate list copy-pasted across most components,
// not bespoke to ct-icon. Its most plausible entry, 1.1.1 Non-text Content
// ("compliance depends on the implementer providing meaningful text
// alternatives"), isn't reachable on an isolated <ct-icon> at all: icon.ts's
// `render()` always emits `<svg aria-hidden="true" role="img" ...>` —
// unconditionally decorative-hidden, with no prop that changes that (no
// `alt`/`aria-label`/`title` property exists on this element). This is
// deliberate, matching CivicTheme's own icon component and every consumer
// that embeds `ct-icon` internally (button/link/tag/tooltip/social-links/
// etc.) and supplies its *own* accessible-name mechanism around it — see
// e.g. tooltip.a11y-conditional.e2e.ts's `label`-driven test, which is
// exactly the "meaningful text alternative" 1.1.1 asks for, just supplied
// by the consumer rather than by ct-icon itself. There is no fixture pair
// that would make ct-icon fail this rule; it structurally cannot.
//
// The rest of icon.json's entries are the same page/app-level boilerplate
// (link purpose, form labels/instructions, status messages, page language)
// already established as out of scope for a single isolated atom — see
// button.a11y-conditional.e2e.ts for the general rationale.
