// wcag-data/field-description.json has no enforced tests in this tier —
// documenting why, per this branch's convention of saying so explicitly
// rather than silently skipping a component (see
// field-message.a11y-conditional.e2e.ts, tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// Walking wcag-data/field-description.json's Conditional entries:
//
// - 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value: both turn on the
//   implementer wiring `aria-describedby` on the associated form control to
//   this element's `id` — `ct-field-description` doesn't render the control,
//   so it can't be pushed into a failing state on its own (same class of
//   "not reachable in isolation" conclusion label.a11y-conditional.e2e.ts
//   already documented for its own `for`/`id` entries). There's also no
//   `rules.mjs` extractor that checks `aria-describedby` wiring at all.
//
// - 2.1.1 Keyboard, 2.4.4 Link Purpose (In Context): both turn on an
//   implementer placing interactive content (e.g. an inline link) inside the
//   component's default `<slot>` — the one entry that looks genuinely
//   testable at first glance, since `rules.mjs` already has a mechanical
//   "2.4.4" extractor for exactly this SC. It doesn't work here, though: that
//   extractor (and every other `kind: "text-mechanical"`/`"text"` rule) reads
//   `host.shadowRoot.querySelectorAll(...)`, and slotted content is never
//   part of the shadow tree — it stays in the *host's own light DOM*, so a
//   `<a>` passed via `<ct-field-description>`'s default slot is invisible to
//   `root.querySelectorAll("a")` no matter what its text says. This is a
//   stricter version of the "nested custom elements block the mechanical
//   text-quality extractors" gap noted in the add-component skill (that one
//   is about a *different* element's shadow root; this is content that never
//   enters any shadow root at all). Flagging as a `rules.mjs` coverage gap
//   per the skill's guidance rather than routing around it here — fixing it
//   would mean teaching the extractor to also walk `host.assignedElements()`
//   / light-DOM children for slot-based components, which affects every
//   component using a bare `<slot>` for supplementary content (also
//   `ct-field-message`), not just this one.
//
// - 3.1.1 Language of Page, 3.1.2 Language of Parts, 3.2.4 Consistent
//   Identification: page/app-level or cross-page consistency concerns no
//   single isolated component preview can be pushed into a failing state
//   for — the same boilerplate already established as out of scope for a
//   single atom (see field-message.a11y-conditional.e2e.ts).
//
// The rest of field-description.json's entries are Pass/Not Present, not
// Conditional, so there's nothing further to convert into a regression test.
