// Enforces wcag-data/logo.json's `Conditional` entries that are actually
// testable on an isolated <ct-logo>. logo.json carries the same generic
// boilerplate list shared across most components, but ct-logo's actual
// rendered markup happens to create a genuine, constructible gap: when
// `url` is set, the whole logo renders as a wrapping `<a>` (logo.ts's
// `render()`) around one or more `<img>` elements whose `alt` props default
// to `''`. An empty-string `alt` is a deliberate, axe-valid way to mark an
// *image* decorative (WCAG technique H67) — so, like ct-image, there's no
// way to make an individual `<img>` here fail axe's `image-alt` rule via
// props alone (see image.a11y-conditional.e2e.ts for the full writeup of
// that specific dead end). But the *wrapping link's own* accessible name is
// a separate, real concern this component does control: it comes from the
// `title` prop (rendered as the anchor's `title` attribute) once every
// contained image is alt="" — if `title` is also empty, the link has
// nothing at all for assistive tech to announce. This mirrors the
// icon-only-accessible-name pattern already established for button/link
// (4.1.2 Name, Role, Value / logo.json's boilerplate "accessible names for
// icon-only [controls]" language), just via `title` instead of `aria-label`.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-logo';

test.describe('ct-logo WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'logo', TAG);
  });

  // wcag-data/logo.json: 4.1.2 Name, Role, Value — the linked logo's only
  // accessible-name sources are `title` and each image's `alt`; with every
  // image alt="" (valid/decorative) and `title` also empty, the link has no
  // accessible name at all.
  test.describe('4.1.2 Name, Role, Value — linked logo accessible name', () => {
    test('FAILS axe link-name when title and every image alt are empty', async ({ page }) => {
      await setComponentProps(page, TAG, {
        title: '',
        primaryMobileAlt: '',
        primaryDesktopAlt: '',
      });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe link-name when title provides a descriptive accessible name', async ({ page }) => {
      await setComponentProps(page, TAG, {
        title: 'City of Springfield — go to homepage',
        primaryMobileAlt: '',
        primaryDesktopAlt: '',
      });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
