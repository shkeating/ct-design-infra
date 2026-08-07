// wcag-data/tabs.json has no enforced tests in this tier — documenting why, per this branch's
// convention of saying so explicitly rather than silently skipping a component (see
// accordion.a11y-conditional.e2e.ts, tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// tabs.json's most plausible entry, 2.4.6 Headings and Labels ("compliance depends on the
// implementer providing clear and descriptive `heading`s"), is real in principle — each
// ct-tabs-item's `heading` is rendered by the parent as the trigger `<button>`'s visible text
// (see tabs.ts's renderTrigger(): `<button role="tab">...${item.heading}</button>`) — but it
// isn't reachable with the current mechanical rules.mjs 2.4.6 extractor, which only evaluates
// `label`/`legend` element text for genericness, never a `<button>`'s. This is the identical
// structural gap already documented in accordion.a11y-conditional.e2e.ts for ct-accordion's
// trigger button (real content, wrong element type for the mechanical rule to look at) and in
// heading.a11y-conditional.e2e.ts for ct-heading's own `<h1>`-`<h6>` text. The interactive audit
// skill's newer `2.4.6-review` rule doesn't cover this either — same heading/label/legend
// selector set, not arbitrary buttons — so this is a real, currently-uncovered case for
// rules.mjs more broadly, not something fixable from this spec file alone.
//
// 4.1.2 Name, Role, Value is Conditional on the same underlying fact (a trigger's accessible
// name is always exactly its visible `heading` text, but the Lit component does not enforce a
// non-empty value at runtime) — again the same caveat already documented for
// ct-accordion-item's `heading`/ct-popover's `triggerText`/ct-tooltip's `label`, with no
// separate aria-label override mechanism on ct-tabs-item to produce a mismatching-accessible-
// name fixture pair against.
//
// No other Conditional entry in tabs.json maps onto a reachable, prop-driven failure: the
// Zag.js tabs machine (see packages/core/src/lib/zag/) wires role="tablist"/"tab"/"tabpanel",
// aria-selected, aria-controls/aria-labelledby, and aria-disabled automatically, not
// conditionally on implementer input — verified directly by tabs.test.ts's own
// `expect(el).to.be.accessible()` axe check, which passes. The rest of tabs.json's entries are
// the same page/app-level boilerplate (link purpose, form labels/instructions, status messages,
// page language, target size for arbitrary short labels) already established as out of scope
// for a single isolated component in every other *.a11y-conditional.e2e.ts file in this repo.
