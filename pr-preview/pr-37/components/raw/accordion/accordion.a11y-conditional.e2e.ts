// wcag-data/accordion.json has no enforced tests in this tier — documenting
// why, per this branch's convention of saying so explicitly rather than
// silently skipping a component (see tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// accordion.json is the same boilerplate list copy-pasted across most
// components, not written with ct-accordion's actual state-machine-driven
// behavior in mind. Its most plausible entry, 2.4.6 Headings and Labels
// ("compliance depends on the implementer providing clear and descriptive
// headings and labels"), is real in principle — each panel's `heading` (a
// `ct-accordion-item` light-DOM child's data) is rendered by the parent as
// the trigger `<button>`'s visible text (see accordion.ts's `render()`:
// `<button>...<span>${item.heading}</span></button>`) — but it isn't
// reachable with the current mechanical rules.mjs 2.4.6 extractor, which
// only evaluates `label`/`legend` element text for genericness, never a
// `<button>`'s. This is the identical structural gap already documented in
// heading.a11y-conditional.e2e.ts for `ct-heading`'s own `<h1>`-`<h6>` text;
// accordion hits it for the same underlying reason (real content, wrong
// element type for the mechanical rule to look at). The interactive audit
// skill's newer `2.4.6-review` rule doesn't cover this either — it extends
// the same heading/label/legend selector set, not arbitrary buttons — so
// this is a real, currently-uncovered case for `rules.mjs` more broadly, not
// something fixable from this spec file alone. No other entry in
// accordion.json maps onto a reachable prop-driven failure: the trigger's
// accessible name is always the visible heading span text (no separate
// `aria-label` mechanism to mismatch), and the Zag.js machine (see
// `packages/core/src/lib/zag/`) wires `aria-expanded`/`aria-disabled`/panel
// `role="region"` automatically, not conditionally on implementer input.
//
// The rest of accordion.json's entries are the same page/app-level
// boilerplate (link purpose, form labels/instructions, status messages,
// page language) already established as out of scope for a single isolated
// component.
