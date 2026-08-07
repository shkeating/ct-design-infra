// wcag-data/heading.json has no enforced tests in this tier — documenting
// why, per this branch's convention of saying so explicitly rather than
// silently skipping a component (see tag.a11y-conditional.e2e.ts).
//
// heading.json is the same boilerplate list copy-pasted across most
// components (identical wording to the pre-audit field-message.json/
// image.json/video.json), not bespoke to ct-heading the way table.json/
// paragraph.json/label.json are. Of its Conditional entries, only 2.4.6
// Headings and Labels ("compliance depends on the implementer providing
// clear and descriptive headings") is arguably testable on an isolated
// <ct-heading> — its entire rendered output *is* an <h1>-<h6> — but the
// mechanical rules.mjs 2.4.6 extractor this CI tier consumes (id "2.4.6",
// kind "text-mechanical") only ever evaluates `label`/`legend` element text
// for genericness; a heading tag's own text is used purely as *context* for
// a label/legend that might follow it, never checked itself. A
// heading-only component can therefore never fail this rule no matter how
// vague its text is — there's no fixture pair that would make this rule
// discriminate FAIL from PASS on <ct-heading>.
//
// This was a real gap, not just a naming mismatch, so it's now fixed at the
// source: rules.mjs gained a `"2.4.6-review"` rule (kind "text") that
// evaluates every heading's own text the same way it evaluates label/legend
// text, specifically so a heading-only component like this one can actually
// be judged. That rule needs Claude in the loop to apply the judgment call
// (see wcag-rubrics.md's 2.4.6 section) — it powers
// `sonnet-a11y-audit`'s interactive audit skill, not this plain-Playwright
// CI tier, which has no model available at test-run time and can only ever
// assert what a fixed heuristic decides. Until the mechanical "2.4.6" rule
// itself gains an equivalent (deterministic) heading check — a real
// rules.mjs change affecting the shared audit skill too, not something to
// route around in this one spec file — the accurate way to check
// <ct-heading>'s 2.4.6 conformance is:
//
//   node .claude/skills/sonnet-a11y-audit/scripts/audit-component.mjs heading
//
// The other entries in heading.json are the same page/app-level boilerplate
// (link purpose, form labels/instructions, status messages, page language)
// already established as out of scope for a single isolated atom — see
// button.a11y-conditional.e2e.ts for the general rationale.
