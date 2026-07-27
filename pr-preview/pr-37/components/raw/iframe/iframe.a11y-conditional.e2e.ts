// wcag-data/iframe.json's 2.4.1/4.1.2 Conditional entries are both keyed on
// the same mechanism (WCAG technique H64 — the native `title` attribute is a
// frame's accessible name) and ct-iframe's `frameTitle` prop *does* have a
// genuinely reachable FAIL state: it's rendered via `ifDefined`, so an unset
// value omits the `title` attribute entirely, and axe-core's `frame-title`
// rule fires on any `<iframe>` lacking an accessible name (verified directly:
// `axe.run(host, {...})` against a live preview with `frameTitle` unset
// reports `violations: ['frame-title']`).
//
// This tier still can't enforce it, though — a coverage gap in shared infra,
// not something this component's own prop can fix. `runAxeFor` (via
// `runAxePhase` in `.claude/skills/sonnet-a11y-audit/scripts/lib/
// audit-engine.mjs`) filters every raw axe finding through
// `references/axe-earl-map.json` before returning it (`mapAxeResults`:
// `if (!mapping) continue;`), and that map has no entry for the `frame-title`
// rule id — unlike `image-alt`/`link-name`/`button-name`, which are all
// present. The net effect: `runAxeFor(page, TAG, 'frame-title')` returns an
// empty findings array *unconditionally*, regardless of whether the live
// `title` attribute is actually missing — so a test built on it can't
// discriminate a real violation from a compliant fixture; it would either
// always "pass" for the wrong reason or always fail. Per this skill's
// parallel-porting convention, `axe-earl-map.json` is shared infrastructure
// the interactive audit skill also depends on, so it isn't edited from here
// — flagged instead, both in this comment and in this port's summary, for a
// human to decide whether to add:
//   "frame-title": { "earlId": "WCAG22:name-role-value", "standard": "4.1.2 Name, Role, Value (Level A)" }
// (and optionally a matching 2.4.1 entry, since H64 is a sufficient technique
// for both SCs) to `.claude/skills/sonnet-a11y-audit/references/
// axe-earl-map.json`.
//
// Note this isn't just a gap in this spec-file tier: `audit-component.mjs`'s
// `auditTag()` also calls `runAxePhase` under the hood (same
// `mapAxeResults`/`AXE_EARL_MAP` filtering), so the interactive audit skill
// would miss this finding too until the map is updated — not a "use the
// other tool instead" situation, a real blind spot in both.
