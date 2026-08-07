// wcag-data/alert.json has no enforced tests in this tier — documenting why,
// per this branch's convention of saying so explicitly rather than silently
// skipping a component (see tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// alert.json is the same boilerplate list copy-pasted across most
// components. Its most plausible entry, 4.1.2 Name, Role, Value ("...
// accessible names for icon-only buttons"), describes a real pattern this
// component actually has — the dismiss control (shown unless `no-dismiss`
// is set) is an icon-only `<ct-button>` — but it isn't a *Conditional*
// concern the way button/link/tooltip/social-links's `aria-label`-driven
// gaps are: alert.ts hardcodes the dismiss button's accessible name as a
// slotted `<span class="visually-hidden">Close ${this.type} alert</span>`
// (see `render()`), built from `this.type` alone with no prop that can make
// it empty. There is no fixture pair — every value `type` can take
// (`information`/`warning`/`error`/`success`) produces a non-empty,
// reasonably descriptive name; this is closer to an always-Pass built into
// the component than something an implementer could get wrong. `heading`/
// `description` render as plain text directly in this component's own
// shadow root (not nested custom elements, unlike callout/next-steps), but
// 2.4.6 Headings and Labels doesn't apply to them either: neither renders
// as a `<label>`/`<legend>` element (nor an `<h1>`-`<h6>` — `heading` is a
// plain `<div>`/`<span>`), so the mechanical rules.mjs 2.4.6 extractor has
// nothing matching to evaluate, the same structural gap documented in
// heading.a11y-conditional.e2e.ts.
//
// The rest of alert.json's entries are the same page/app-level boilerplate
// (link purpose, form labels/instructions, page language) already
// established as out of scope for a single isolated component.
