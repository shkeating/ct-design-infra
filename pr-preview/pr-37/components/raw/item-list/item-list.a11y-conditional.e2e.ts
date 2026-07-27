// wcag-data/item-list.json has no enforced tests in this tier — documenting
// why, per this branch's convention of saying so explicitly rather than
// silently skipping a component (see tag.a11y-conditional.e2e.ts).
//
// Unlike most components in this tier, item-list.json is already bespoke —
// short and specific rather than the generic boilerplate — but both of its
// Conditional entries describe *cross-page* consistency concerns an
// isolated component preview can't be pushed into a failing state for:
//   - 3.1.2 Language of Parts: depends on the implementer setting `lang` on
//     an individual item's content when it differs from the page's — a
//     page-level attribute this component doesn't render or control.
//   - 3.2.4 Consistent Identification: depends on the implementer using
//     `ct-item-list` "consistently (same direction/size) for the same kind
//     of list wherever it recurs across the site" — a claim about usage
//     across multiple pages, not something a single rendered instance has
//     a right or wrong answer for on its own.
//
// Neither has a component-local fixture pair (a "wrong" list vs. a "right"
// one) that would make sense in isolation — there is no `rules.mjs` rule
// for either, and none would apply to a single preview even if one existed.
