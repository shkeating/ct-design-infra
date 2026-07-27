// wcag-data/image.json has no enforced tests in this tier — documenting
// why, per this branch's convention of saying so explicitly rather than
// silently skipping a component (see tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// image.json is the same boilerplate list copy-pasted across most
// components — most of its entries (headings/labels, form instructions,
// status messages) don't apply to ct-image at all, which renders a single
// `<img>` and nothing else. Its one entry that's genuinely this component's
// concern, 1.1.1 Non-text Content ("compliance depends on the implementer
// providing meaningful text alternatives"), has no reachable FAIL state via
// props: image.ts's `alt` property defaults to `''` and is always rendered
// as the `alt` attribute (`alt=${this.alt}`), never omitted. An empty-string
// `alt` is a deliberate, valid way to mark an image decorative per WCAG
// technique H67, so axe's `image-alt` rule always passes it regardless of
// whether the image is actually decorative or a caller simply forgot to
// describe it — there is no fixture (compliant or not) that produces a
// discriminating axe verdict. Judging whether a *present, non-empty* alt
// value is actually meaningful (vs. "image", a filename, etc.) is exactly
// the kind of contextual call `sonnet-a11y-audit`'s interactive skill's
// 1.1.1 rubric exists for — see `references/wcag-rubrics.md`'s "1.1.1 —
// Non-text Content" section — not something a plain Playwright assertion
// can make without a model in the loop.
//
// See table.a11y-conditional.e2e.ts / paragraph.a11y-conditional.e2e.ts /
// basic-content.a11y-conditional.e2e.ts for the cases where 1.1.1 *is*
// enforceable here: an `<img>` embedded in a trusted-HTML prop can have its
// `alt` attribute omitted entirely by the implementer, which axe correctly
// flags. ct-image's own `alt` prop doesn't have that failure mode.
