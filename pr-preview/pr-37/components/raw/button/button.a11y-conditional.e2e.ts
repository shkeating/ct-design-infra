// Enforces wcag-data/button.json's `Conditional` entries that are actually
// testable on an isolated <ct-button> — turning the prose observation into a
// compliant/non-compliant fixture pair, so a regression in either the
// component or a future prop change gets caught instead of silently drifting
// from the checked-in conformance claim.
//
// Not every Conditional entry in button.json became a test here — most of
// that file's Conditional list is boilerplate shared verbatim across many
// components (1.3.1, 1.4.1, 2.4.6, 3.1.1/3.1.2, 3.2.1/3.2.2, 3.3.1/3.3.2/3.3.3,
// 4.1.3, 1.3.5) and describes page/app-level concerns (form validation,
// autocomplete, page language, live regions) a single <button> can't
// meaningfully be pushed into a failing state for on its own. Converting
// those would produce tests that trivially pass regardless of the component's
// actual behavior — see the design discussion in this branch's history.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runExtractor, extractorPassed, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-button';

test.describe('ct-button WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'button', TAG);
  });

  // wcag-data/button.json: 4.1.2 Name, Role, Value — "compliance often depends
  // on the implementer providing accessible names for icon-only buttons."
  // ct-button has no visible text at all once `label` is empty, so the only
  // way to satisfy this is the `aria-label` property.
  test.describe('4.1.2 Name, Role, Value — icon-only accessible name', () => {
    test('FAILS axe button-name when an icon-only button has no aria-label', async ({ page }) => {
      await setComponentProps(page, TAG, { label: '', icon: 'download', ariaLabel: null });
      const findings = await runAxeFor(page, TAG, 'button-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe button-name when an icon-only button sets aria-label', async ({ page }) => {
      await setComponentProps(page, TAG, { label: '', icon: 'download', ariaLabel: 'Download report' });
      const findings = await runAxeFor(page, TAG, 'button-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });

  // wcag-data/button.json: 2.5.3 Label in Name — "compliance depends on the
  // implementer ensuring any accessible name (e.g., aria-label) contains the
  // visible text." button's `label` is always the visible text, so an
  // `aria-label` that doesn't contain it is a real, constructible failure.
  test.describe('2.5.3 Label in Name — aria-label must contain the visible label', () => {
    test('FAILS when aria-label does not contain the visible label text', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Submit form', ariaLabel: 'Cancel' });
      const result = await runExtractor(page, TAG, '2.5.3');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES when there is no aria-label override (accessible name is the visible text)', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Submit form', ariaLabel: null });
      const result = await runExtractor(page, TAG, '2.5.3');
      expect(extractorPassed(result)).toBe(true);
    });
  });

  // wcag-data/button.json: 2.4.4 Link Purpose (In Context) — applies when
  // `kind="link"` renders an <a role="button">; "compliance depends on the
  // implementer providing clear and descriptive link text."
  test.describe('2.4.4 Link Purpose — kind="link" button text', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setComponentProps(page, TAG, { kind: 'link', url: '#', label: 'Click Here' });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setComponentProps(page, TAG, { kind: 'link', url: '#', label: 'Download the quarterly budget breakdown' });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
