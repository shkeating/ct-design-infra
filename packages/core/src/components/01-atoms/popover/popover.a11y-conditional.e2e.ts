// wcag-data/popover.json has no genuinely testable Conditional subset at ct-popover's own
// level, so this file intentionally enforces zero tests - see "Nested custom elements block
// the mechanical text-quality extractors" in .claude/skills/add-component/SKILL.md, and
// ct-callout/ct-next-steps/ct-attachment for the same documented outcome.
//
// Why each Conditional entry doesn't convert into a test here:
//
//   - 2.4.4 Link Purpose / 2.4.6 Headings and Labels / 4.1.2 Name, Role, Value (the
//     `triggerText` quality/presence entries) - the trigger's actual text renders inside a
//     *nested* <ct-link>'s own, separate shadow root (see popover.ts's render(): ct-popover
//     composes <ct-link> rather than rendering a raw <a> itself). `runExtractor`'s mechanical
//     "2.4.4"/"2.4.6" rules only query the target tag's own shadow root - pointed at
//     'ct-popover' they would silently see nothing at all, not a real negative result. Axe
//     (via `runAxeFor`) does traverse into nested shadow roots and could confirm accessible-name
//     *presence*, but ct-link.a11y-conditional.e2e.ts already enforces exactly that (its
//     "4.1.2 Name, Role, Value" and "2.4.4 Link Purpose" describe blocks) at the level where
//     this text actually renders - re-asserting it here through an extra layer of composition
//     would just be a duplicate of that file's coverage, not a new check.
//   - An empty `triggerText` doesn't produce an inaccessible *trigger* to flag in the first
//     place: ct-link's own render() returns `nothing` when both `label` and `icon` are empty
//     (see link.ts), so ct-popover ends up with no interactive element in the DOM at all
//     rather than one with a missing accessible name - there's nothing for axe's `link-name`/
//     `button-name` rules to attach a finding to. This mirrors `image`/`banner`'s note in
//     SKILL.md: a prop that can't reach a genuinely failing *rendered* state has no
//     discriminating fixture pair, no matter how real the underlying concern is.
//   - 1.4.5 Images of Text / 1.4.10 Reflow (embedded `content`/`content-top`/`content-bottom`
//     HTML) - depend entirely on what the implementer embeds via `unsafeHTML`, which isn't
//     something any current `rules.mjs` extractor evaluates (no "arbitrary embedded markup"
//     rule exists, mechanical or otherwise).
//   - 2.5.8 Target Size - a visual/layout measurement, not a DOM/text-quality check any
//     current extractor covers.
//   - 3.1.2 Language of Parts / 3.2.4 Consistent Identification - page/app-level or
//     cross-site consistency concerns a single isolated component render can't be pushed into
//     a failing state for, same rationale used throughout this tier (see button/link's own
//     files).
//
// `.claude/skills/sonnet-a11y-audit/scripts/audit-component.mjs popover --all-variants` is the
// accurate way to get deeper, judgment-based coverage of the nested-composition and
// embedded-HTML cases above, since it runs axe across the full rendered tree and can have
// Claude review composed/nested markup contextually - not something a plain Playwright
// assertion in this file can substitute for.
