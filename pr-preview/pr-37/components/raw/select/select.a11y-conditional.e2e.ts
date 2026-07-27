// Enforces wcag-data/select.json's `Conditional` entries that are actually
// testable on an isolated <ct-select>.
//
// Most of select.json's Conditional entries describe page/implementer-level
// concerns an isolated component preview can't be pushed into a failing
// state for on its own: 1.3.5 (autocomplete), 1.4.1/1.4.3/1.4.11 (color/
// contrast token-sourcing caveats, not a runtime-togglable state), 2.4.6
// (see below), 3.1.1/3.1.2 (page lang), 3.2.2/3.2.4 (implementer's own
// change-handler/consistency choices across the site), 3.3.1/3.3.2/3.3.3
// (pairing with a separate `ct-field-message`, which this component doesn't
// render), and 2.5.3 (depends on visible label text rendered *elsewhere* on
// the page, which an isolated preview has no visible copy of to compare
// against).
//
// 2.4.6 Headings and Labels doesn't convert either, but for a different,
// structural reason: rules.mjs's mechanical "2.4.6" extractor only ever
// evaluates `label`/`legend` element text (see its own comment in
// rules.mjs). ct-select's shadow root renders `<select>`/`<option>`/
// `<optgroup>`, never a `<label>` or `<legend>` — so the extractor finds zero
// items and unconditionally reports PASS regardless of how vague an
// option/optgroup label actually is. Not a discriminating fixture pair; see
// audit-component.mjs's "2.4.6-review" rubric for the version that can
// actually judge this.
//
// The one entry that *does* convert cleanly: 1.3.1 / 4.1.2 Name, Role,
// Value. ct-select renders its real <select> inside a shadow root, so a
// `<label for="...">` in the implementer's light DOM can never reach it —
// this component's only accessible-naming mechanism is `aria-label`,
// forwarded directly onto the internal <select>. That is a genuine,
// constructible pass/fail on this component alone, the same shape as
// button.a11y-conditional.e2e.ts's icon-only `aria-label` case.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-select';

test.describe('ct-select WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'select', TAG);
  });

  // wcag-data/select.json: 1.3.1 / 4.1.2 — native `for`/`id` label
  // association cannot cross this component's shadow boundary, so
  // `aria-label` is the only supported way to give it an accessible name.
  test.describe('1.3.1 / 4.1.2 Name, Role, Value — accessible name via aria-label', () => {
    test('FAILS axe select-name when there is no aria-label', async ({ page }) => {
      await setComponentProps(page, TAG, { ariaLabel: null });
      const findings = await runAxeFor(page, TAG, 'select-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe select-name when aria-label is set', async ({ page }) => {
      await setComponentProps(page, TAG, { ariaLabel: 'Choose a fruit' });
      const findings = await runAxeFor(page, TAG, 'select-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
