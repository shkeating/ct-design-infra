// Enforces wcag-data/radio.json's `Conditional` entries that are actually
// testable on an isolated <ct-radio>.
//
// Most of radio.json's Conditional list (1.3.5's not-applicable autocomplete,
// 1.4.1's color-only invalid state, 3.1.1/3.1.2's page lang, 3.2.4's
// cross-page consistency, 3.3.1/3.3.3's paired-message text, 2.4.6's label-
// quality, 2.5.8's combined-target-size) either describes a page/app-level or
// paired-component concern a single isolated <ct-radio> preview can't be
// pushed into a failing state for, or has no matching mechanical rules.mjs
// extractor. Two are genuinely testable, following the same pattern
// input.a11y-conditional.e2e.ts already established for the identical
// underlying mechanism (aria-label as the only working accessible-name path,
// since a sibling/composed label's `for`/`id` can't cross a shadow-DOM
// boundary):
//
// 3.3.2 Labels or Instructions (the practical enforcement point for the
// related 1.3.1/4.1.2 entries) — checked empirically, same as ct-input: the
// mechanical 4.1.2 extractor's selector list is button/a/input[type=submit
// |button] only, so a plain input[type=radio] never reaches it. The rule
// that actually fires for an unnamed radio is axe-core's `label` rule, which
// this repo's axe-earl-map.json maps to 3.3.2, not 4.1.2.
//
// 2.5.3 Label in Name — unlike ct-input (where placeholder/aria-label can
// legitimately diverge), ct-radio's aria-label always defaults to the
// visible `label` text verbatim, so this is enforced as a genuine identity
// check rather than a heuristic.
//
// The 1.3.1 "cross-shadow-root for/id" and 2.1.1/4.1.2 "cross-shadow-root
// radio-group" architectural gaps documented in radio.json have no
// rules.mjs extractor at all (there is no mechanical check for "do multiple
// custom elements form one native radio-button group") and are not testable
// here — see the class doc comment in radio.ts and radio.json's own
// observations for the full accounting instead.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-radio';

test.describe('ct-radio WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'radio', TAG);
  });

  // wcag-data/radio.json: 3.3.2 Labels or Instructions / 1.3.1 Info and
  // Relationships / 4.1.2 Name, Role, Value — the control has no accessible
  // name at all without a `label` (or `ariaLabel` override), since the
  // composed <ct-label>'s `for`/`id` cannot reach into this component's
  // shadow root.
  test.describe('3.3.2 / 1.3.1 / 4.1.2 — accessible name only comes from aria-label', () => {
    test('FAILS axe "label" rule when there is no label or aria-label', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'contact', id: 'contact-email', label: '', ariaLabel: null });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe "label" rule when label is set', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'contact', id: 'contact-email', label: 'Email', ariaLabel: null });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });

  // wcag-data/radio.json: 2.5.3 Label in Name — the accessible name always
  // defaults to the visible label text verbatim, so it can never diverge
  // unless an implementer deliberately overrides `ariaLabel`.
  test.describe('2.5.3 — aria-label defaults to the visible label text', () => {
    test('mirrors label text onto aria-label when no override is set', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'contact', id: 'contact-email', label: 'Email address', ariaLabel: null });
      const ariaLabel = await page.evaluate((tag) => {
        const host = document.querySelector(tag) as Element;
        return host.shadowRoot!.querySelector('input')!.getAttribute('aria-label');
      }, TAG);
      expect(ariaLabel).toBe('Email address');
    });
  });
});
