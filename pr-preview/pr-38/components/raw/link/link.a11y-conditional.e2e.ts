// Enforces wcag-data/link.json's `Conditional` entries that are actually
// testable on an isolated <ct-link>. See button.a11y-conditional.e2e.ts for
// why most of that file's Conditional list (shared boilerplate describing
// page/app-level concerns) isn't converted into a test here.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runExtractor, extractorPassed, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-link';

test.describe('ct-link WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'link', TAG);
  });

  // wcag-data/link.json: 4.1.2 Name, Role, Value — "compliance often depends
  // on the implementer providing accessible names for icon-only buttons"
  // (link.config.json's own `only-icon` variant, icon set + label: "", is
  // exactly this shape). Before ariaLabel existed on ct-link, this was
  // unsatisfiable through the component's public API at all.
  test.describe('4.1.2 Name, Role, Value — icon-only accessible name', () => {
    test('FAILS axe link-name when an icon-only link has no aria-label', async ({ page }) => {
      await setComponentProps(page, TAG, { label: '', icon: 'right-arrow-1', ariaLabel: null });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe link-name when an icon-only link sets aria-label', async ({ page }) => {
      await setComponentProps(page, TAG, { label: '', icon: 'right-arrow-1', ariaLabel: 'Next page' });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });

  // wcag-data/link.json: 2.5.3 Label in Name — "compliance depends on the
  // implementer ensuring any accessible name (e.g., aria-label) contains the
  // visible text."
  test.describe('2.5.3 Label in Name — aria-label must contain the visible label', () => {
    test('FAILS when aria-label does not contain the visible label text', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Read the annual report', url: '#', ariaLabel: 'Skip to content' });
      const result = await runExtractor(page, TAG, '2.5.3');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES when there is no aria-label override (accessible name is the visible text)', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Read the annual report', url: '#', ariaLabel: null });
      const result = await runExtractor(page, TAG, '2.5.3');
      expect(extractorPassed(result)).toBe(true);
    });
  });

  // wcag-data/link.json: 2.4.4 Link Purpose (In Context) — the standard this
  // component exists to render; "compliance depends on the implementer
  // providing clear and descriptive link text."
  test.describe('2.4.4 Link Purpose — link text quality', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Click here', url: '#', ariaLabel: null });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Download the quarterly budget breakdown', url: '#', ariaLabel: null });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
