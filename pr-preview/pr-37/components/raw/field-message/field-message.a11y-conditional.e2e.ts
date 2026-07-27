// wcag-data/field-message.json has no enforced tests in this tier —
// documenting why, per this branch's convention of saying so explicitly
// rather than silently skipping a component (see
// tag.a11y-conditional.e2e.ts, heading.a11y-conditional.e2e.ts).
//
// field-message.json is the same boilerplate list copy-pasted across most
// components, not bespoke to ct-field-message. The one entry that's
// plausibly this component's own concern — 4.1.3 Status Messages
// ("compliance depends on the implementer correctly exposing dynamic state
// changes to assistive technologies via aria-live regions") — is real:
// field-message.ts's `render()` emits a plain `<div>` with no `role` or
// `aria-live` attribute at all, for any `type` (including `error`), so a
// message that appears dynamically after form validation currently isn't
// announced to a screen reader. That's a genuine, constructible gap, but
// there is no matching rule in `rules.mjs` (`RULES`/`INTERACTIVE_RULES`) to
// enforce it — no extractor checks for `aria-live`/`role="status"` presence
// on arbitrary content. Adding one is a real `rules.mjs` gap worth fixing
// (it would also benefit `sonnet-a11y-audit`'s interactive skill, not just
// this component), not something to route around in this spec file — see
// this tier's own convention (button.a11y-conditional.e2e.ts,
// SKILL.md) of flagging rule-engine gaps rather than fixing them inline
// from a single component's test.
//
// The rest of field-message.json's entries are the same page/app-level
// boilerplate (link purpose, form labels/instructions, page language)
// already established as out of scope for a single isolated atom.
