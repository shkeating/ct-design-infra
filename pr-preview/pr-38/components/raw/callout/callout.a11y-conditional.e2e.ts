// wcag-data/callout.json has no enforced tests in this tier — documenting
// why, per this branch's convention of saying so explicitly rather than
// silently skipping a component (see tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// callout.json is the same boilerplate list copy-pasted across most
// components. Its two most plausible entries — 2.4.6 Headings and Labels
// (the `heading` prop) and 2.4.4 Link Purpose (each `ct-callout-link`'s
// text) — aren't reachable with the tools this tier has: callout.ts
// composes `heading`/`content` into nested `<ct-heading>`/`<ct-paragraph>`
// elements, and each link into a nested `<ct-button>` inside
// `<ct-item-list-item>` (see `render()`), all separate custom elements with
// their own shadow roots the mechanical rules.mjs extractors can't see (the
// same "doesn't pierce a nested shadow boundary" limitation documented in
// breadcrumb.a11y-conditional.e2e.ts / attachment.a11y-conditional.e2e.ts).
// Text-quality checks against those nested elements' *own* rendered output
// would really be re-testing `ct-heading`/`ct-paragraph`'s own conditional
// entries (already covered by heading.a11y-conditional.e2e.ts and
// paragraph.a11y-conditional.e2e.ts) rather than anything specific to
// `ct-callout` itself, so it isn't duplicated here.
//
// The rest of callout.json's entries are the same page/app-level
// boilerplate (form labels/instructions, status messages, page language)
// already established as out of scope for a single isolated component.
