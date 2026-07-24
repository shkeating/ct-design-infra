// Enforces wcag-data/input.json's `Conditional` entries that are actually
// testable on an isolated <ct-input>.
//
// Most of input.json's Conditional list (1.3.5's missing autocomplete prop,
// 1.4.1's color-only invalid state, 3.1.1/3.1.2's page lang, 3.2.4's
// cross-page consistency, 3.3.1/3.3.3's paired-message text, 2.4.6/2.5.3's
// label-quality entries) either describes a page/app-level or paired-
// component concern a single isolated <ct-input> preview can't be pushed
// into a failing state for, or has no matching mechanical rules.mjs
// extractor. One does convert cleanly:
//
// 3.3.2 Labels or Instructions (also the practical enforcement point for the
// related 1.3.1/4.1.2 entries) — ct-input's accessible name is only ever
// supplied by `aria-label` (see input.json's 1.3.1 entry on why an external
// <label for> can't reach across the shadow-DOM boundary into this
// component's rendered <input>). Checked empirically: rules.mjs's own 4.1.2
// mechanical extractor only looks at button/a/input[type=submit|button] — a
// plain text input isn't in its selector list, so it can never flag this
// component. The rule that actually fires for a bare unlabeled <input> is
// axe-core's `label` rule ("Ensure every form element has a label"), which
// this repo's own axe-earl-map.json maps to 3.3.2, not 4.1.2 — confirmed by
// running axe against a <ct-input> with no aria-label. Same pattern as
// button.a11y-conditional.e2e.ts using runAxeFor for button-name/link-name
// presence checks instead of a text-quality extractor.
//
// 2.5.3 Label in Name has a rules.mjs extractor that *does* include "input"
// in its selector list — but for INPUT elements it treats the `placeholder`
// attribute as the "visible label" (see rules.mjs's `getVisibleLabel`).
// That's a real conceptual gap for this component: placeholder text is
// hint/example content, not a persistent visible label, and CivicTheme's own
// input intentionally supports placeholder and aria-label saying different
// things (e.g. placeholder "you@example.com" as an example value, aria-label
// "Email address" as the actual accessible name) without that being a real
// 2.5.3 violation. Encoding the extractor's literal behavior here would
// codify a false positive as a passing/failing spec. Flagged as a rules.mjs
// calibration gap rather than routed around with an unrealistic fixture —
// not converted into a test.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-input';

test.describe('ct-input WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'input', TAG);
  });

  // wcag-data/input.json: 3.3.2 Labels or Instructions / 1.3.1 Info and
  // Relationships / 4.1.2 Name, Role, Value — "the control has no accessible
  // name at all" without `aria-label`, since a sibling <label for> cannot
  // reach into this component's shadow root.
  test.describe('3.3.2 / 1.3.1 / 4.1.2 — accessible name only comes from aria-label', () => {
    test('FAILS axe "label" rule when there is no aria-label', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'email', ariaLabel: null, placeholder: '' });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe "label" rule when aria-label is set', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'email', ariaLabel: 'Email address', placeholder: '' });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
