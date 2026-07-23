// wcag-data/video.json has no enforced tests in this tier — documenting why,
// per this branch's convention of saying so explicitly rather than silently
// skipping a component (see tag.a11y-conditional.e2e.ts,
// heading.a11y-conditional.e2e.ts).
//
// video.json is the same boilerplate list copy-pasted across most
// components, not written with ct-video's actual props (`src`, `poster`,
// `videoTitle`, `fallbackText`) in mind — most of its entries (1.2.x
// captions/audio-description) are correctly marked "Not Present" elsewhere
// in the same file rather than Conditional, since ct-video doesn't manage
// caption tracks itself, so nothing here contradicts that. Its 1.1.1 entry
// ("meaningful text alternatives") is the closest fit, but doesn't map onto
// a testable gap: video.ts's `videoTitle` prop *is* genuinely optional
// (rendered as `title=${ifDefined(this.videoTitle)}` — omitted entirely
// when unset, a real constructible before/after), but there is no axe rule
// (unlike `button-name`/`link-name`/`image-alt`) that checks a `<video>`
// element for an accessible name, and no matching `rules.mjs` extractor
// either — WCAG doesn't have a strict "video must be named" success
// criterion the way it does for interactive controls, so nothing in this
// tier's toolkit can enforce it either way. `fallbackText` (shown to
// browsers without HTML5 `<video>` support) is always a real, non-empty
// default string, so it has no reachable failing state via props.
//
// The rest of video.json's entries are the same page/app-level boilerplate
// (link purpose, form labels/instructions, status messages, page language)
// already established as out of scope for a single isolated atom.
