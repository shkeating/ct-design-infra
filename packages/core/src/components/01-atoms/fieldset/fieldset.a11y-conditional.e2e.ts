// No wcag-data/fieldset.json exists — documenting why this tier has zero
// enforced tests, per this branch's convention of saying so explicitly
// rather than silently skipping a component (see
// tag.a11y-conditional.e2e.ts, heading.a11y-conditional.e2e.ts,
// field-message.a11y-conditional.e2e.ts).
//
// Unlike those components, there is no upstream wcag-data/fieldset.json to
// even shallow-copy from, and the task that produced this port explicitly
// called that "expected, not a blocker" and directed proceeding on general
// WCAG guidance instead of authoring one non-interactively. That's a
// deliberate deviation from this skill's usual "write one, don't just flag
// the gap" rule (see SKILL.md's "Parallel porting" section) — flagged here
// and in the port's summary, not silently done. A wcag-data/fieldset.json
// should still get written in a follow-up with human review, the same way
// wcag-data/label.json (this skill's worked example) was.
//
// Without that file there's no `Conditional` entry list to convert into
// enforced tests here. The one general-WCAG concern this component's own
// markup can actually violate is a fieldset/legend grouping one (roughly
// 1.3.1 Info and Relationships / 4.1.2 Name, Role, Value: the group's
// accessible name should come from its legend) — but ct-fieldset.ts already
// closes that gap structurally rather than needing a regression test for it:
// the real <legend> lives two shadow-tree levels down (inside the composed
// ct-label's own shadow root), which the native fieldset/legend
// accessible-name algorithm can't reach, so the component also mirrors
// `legend` onto `aria-label` on the native <fieldset> directly (see the
// class-doc on CtFieldset and the "mirrors the legend into aria-label" case
// in fieldset.test.ts, which is where this is actually asserted — a plain
// DOM/unit-test assertion, not something `rules.mjs`/axe needs to arbitrate).
//
// 2.4.6 Headings and Labels (legend text quality) would be the other
// candidate, but the mechanical rules.mjs "2.4.6" extractor (kind
// "text-mechanical") only queries the target tag's *own* shadow root; a
// ct-fieldset's legend text renders inside a nested <ct-label>'s separate
// shadow root, so `runExtractor(page, 'ct-fieldset', '2.4.6')` would see no
// legend/label text at all — the same nested-custom-element gap documented
// in SKILL.md for ct-callout/ct-next-steps/ct-attachment, not something to
// route around here. `sonnet-a11y-audit`'s interactive audit skill (which
// traverses shadow roots via axe-core/Playwright rather than this tier's
// same-shadow-root-only extractor) is the accurate way to check it:
//
//   node .claude/skills/sonnet-a11y-audit/scripts/audit-component.mjs fieldset
