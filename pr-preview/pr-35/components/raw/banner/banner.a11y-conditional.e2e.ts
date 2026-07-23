// wcag-data/banner.json has no enforced tests in this tier — documenting
// why, per this branch's convention of saying so explicitly rather than
// silently skipping a component (see tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// banner.json is the same boilerplate list copy-pasted across most
// components. Its most plausible entry, 1.1.1 Non-text Content, looks at
// first glance like it should apply to banner.ts's two image mechanisms —
// but both are structurally guarded against ever reaching a failing,
// prop-driven state:
//   - The background image's accessible name (a visually-hidden `<span
//     role="img" aria-label=${this.backgroundImageAlt}>`) only renders at
//     all when *both* `backgroundImageUrl` **and** `backgroundImageAlt` are
//     set (`render()`: `${this.backgroundImageUrl && this.backgroundImageAlt
//     ? html\`...\` : nothing}`) — there's no way to reach a rendered
//     `role="img"` span with an empty `aria-label`; it simply doesn't render
//     until a real alt value exists.
//   - The featured image renders through a nested `<ct-image>` (`render()`:
//     `<ct-image url=${this.featuredImageUrl} alt=${this.featuredImageAlt}>`),
//     which — per image.a11y-conditional.e2e.ts — always renders its `alt`
//     attribute (default `''`), a deliberate, axe-valid way to mark an image
//     decorative, so there's no reachable FAIL there either even before
//     considering that it's a nested custom element the mechanical
//     extractors can't see into.
// `siteSection`/`title` render through nested `<ct-heading>` elements (not
// reachable by the mechanical 2.4.6 extractor even if they had a gap — see
// callout.a11y-conditional.e2e.ts for the identical nested-shadow-root
// limitation).
//
// The rest of banner.json's entries are the same page/app-level boilerplate
// (link purpose, form labels/instructions, status messages, page language)
// already established as out of scope for a single isolated component.
