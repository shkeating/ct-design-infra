// wcag-data/next-steps.json has no enforced tests in this tier —
// documenting why, per this branch's convention of saying so explicitly
// rather than silently skipping a component (see
// tag.a11y-conditional.e2e.ts, heading.a11y-conditional.e2e.ts).
//
// next-steps.json is the same boilerplate list copy-pasted across most
// components. Its two most plausible entries — 2.4.6 Headings and Labels
// (the `heading` prop) and 2.4.4 Link Purpose (`linkUrl`'s text, which
// reuses `heading` as the link label) — aren't reachable with the tools
// this tier has: next-steps.ts always composes `heading`/`content` into a
// nested `<ct-heading>` or, when `linkUrl` is set, a nested `<ct-link>`
// inside a native `<h4>` (see `render()`'s `titleTemplate`), and `content`
// into a nested `<ct-paragraph>` — all separate custom elements with their
// own shadow roots the mechanical rules.mjs extractors can't see (the same
// "doesn't pierce a nested shadow boundary" limitation documented in
// breadcrumb.a11y-conditional.e2e.ts / callout.a11y-conditional.e2e.ts).
// Text-quality checks against those nested elements' own rendered output
// would really be re-testing `ct-heading`/`ct-link`/`ct-paragraph`'s own
// conditional entries (already covered by their own spec files) rather
// than anything specific to `ct-next-steps` itself.
//
// The rest of next-steps.json's entries are the same page/app-level
// boilerplate (form labels/instructions, status messages, page language)
// already established as out of scope for a single isolated component.
