// wcag-data/tag-list.json has no enforced tests in this tier — documenting
// why, per this branch's convention of saying so explicitly rather than
// silently skipping a component (see item-list.a11y-conditional.e2e.ts /
// tag.a11y-conditional.e2e.ts).
//
// The one Conditional entry with a genuine fixture pair — 2.4.4 Link Purpose,
// on a url-bearing tag's link text — is not testable *at ct-tag-list's own
// level*: ct-tag-list renders each tag as a nested `<ct-tag>` custom element,
// and the actual `<a>` text lives inside *that* element's own shadow root,
// not a raw element in ct-tag-list's own template. `runExtractor`'s text-kind
// extractors (used for 2.4.4/2.4.6) only query the target tag's own shadow
// root — they don't pierce into a nested custom element's separate shadow
// root the way `runAxeFor`'s full axe-core traversal does (see the "Nested
// custom elements" note in .claude/skills/add-component/SKILL.md and
// callout/next-steps/attachment's equivalent files for the same situation).
// Pointing `runExtractor` at `ct-tag-list` would silently see nothing at all.
// `ct-tag` already has its own `tag.a11y-conditional.e2e.ts` enforcing this
// exact concern directly against the element that actually renders the `<a>`
// — duplicating it here would just re-test ct-tag's own logic through an
// extra layer of indirection, not anything unique to ct-tag-list's
// composition.
//
// 2.5.3 Label in Name and 4.1.2 Name, Role, Value are rated an unconditional
// Pass in wcag-data/tag-list.json, not Conditional — `content` is a required
// property on every `ct-tag-list-item` (unlike, say, `ct-social-links-item`'s
// optional `linkTitle`), so there is no icon-only/no-accessible-name failure
// mode to construct a fixture pair for; a tag can never render without its
// own visible text becoming its accessible name.
//
// 2.4.7 Focus Visible / 1.4.11 Non-text Contrast: auditing this component
// surfaced a genuine finding — the composed `ct-tag` (already-merged,
// separately-owned 01-atoms/tag component, unchanged by this port) compiles
// its `:focus-visible` rule to only `text-decoration: none`, with no
// `outline`/`box-shadow` at all, so a url-bearing tag gets no visible focus
// indicator when tabbed to. This is a real accessibility gap, but it lives in
// `ct-tag` itself, not in anything `ct-tag-list` controls or could be pushed
// into a passing/failing state for on its own — there is no component-local
// fixture pair to test here (every tag composed by ct-tag-list would exhibit
// the same missing-outline behavior identically, regardless of any
// ct-tag-list prop). Documented in wcag-data/tag-list.json's own entries and
// flagged in this port's summary for follow-up on ct-tag directly, per
// SKILL.md's rule that wcag-data/<name>.json itself is never edited from this
// tier without a human review pass.
//
// The remaining Conditional entries (1.1.1 non-text content in the
// content-top/content-bottom slots, 1.4.3/1.4.1 color/contrast for the same
// slots, 3.1.2 language of parts, 3.2.4 consistent identification across the
// site) describe implementer-authored free-form content or cross-page
// consistency concerns an isolated component preview can't be pushed into a
// failing state for — same rationale established throughout this tier (see
// item-list.a11y-conditional.e2e.ts).
