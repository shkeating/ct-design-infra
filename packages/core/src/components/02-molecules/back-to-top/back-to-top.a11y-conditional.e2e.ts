// Enforces wcag-data/back-to-top.json's `Conditional` entries that are
// actually testable on an isolated <ct-back-to-top> — turning the prose
// observation into a compliant/non-compliant fixture pair, so a regression
// gets caught instead of silently drifting from the checked-in conformance
// claim.
//
// Only one underlying, testable concern exists here: 1.1.1 and 4.1.2 both
// hinge on the same thing — the composed `ct-button` (kind="link", so it
// renders an <a role="button">) has no visible text at all (icon-only), so
// its accessible name comes entirely from `ct-back-to-top`'s `label` prop,
// forwarded as the inner `ct-button`'s `aria-label`. Axe's DOM/accessibility-
// tree traversal pierces the nested `ct-button` shadow root fine, so
// `runAxeFor` against `ct-back-to-top` catches a real missing-name failure.
//
// Every other Conditional entry in back-to-top.json was deliberately left
// unenforced here:
// - 2.4.4 / 2.4.6 (link/label text quality): `runExtractor`'s mechanical
//   extractor only queries the target tag's *own* shadow root for `<a>`
//   elements (see rules.mjs's "2.4.4" `relevantSelectors: ["a"]` +
//   `root.querySelectorAll("a")`, where `root = host.shadowRoot`). This
//   component's actual `<a>` lives inside the nested `ct-button`'s *separate*
//   shadow root, so the extractor finds nothing at the `ct-back-to-top`
//   level — the same nested-custom-element gap `callout`/`next-steps`/
//   `attachment` document for themselves. Even setting that aside, the
//   extractor judges *visible textContent*, and this button is icon-only
//   with none — so it would trivially "PASS" with zero discriminating power
//   either way. No testable subset here; `audit-component.mjs back-to-top`
//   is the accurate way to check link-purpose quality for this component.
// - 2.4.3 (focus order) and 2.4.11 (focus not obscured): both depend on
//   where an *implementer* places this fixed-position element in their own
//   page's DOM/layout relative to other content — not something any prop
//   on an isolated `<ct-back-to-top>` fixture can be toggled into a failing
//   state for.
// - 1.4.11 (non-text contrast): the documented border-color deviation (see
//   `back-to-top.ts`'s code comment — the composed `ct-button`'s border
//   always renders the same color as its background, a structural artifact
//   of composing the shared `ct-button` component) is constant regardless of
//   any prop this component exposes, so there is no compliant/non-compliant
//   fixture pair to assert between.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-back-to-top';

test.describe('ct-back-to-top WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'back-to-top', TAG);
  });

  // wcag-data/back-to-top.json: 1.1.1 Non-text Content / 4.1.2 Name, Role,
  // Value — "only fails if an implementer explicitly overrides `label` to
  // an empty string." The composed button is icon-only, so `label` (forwarded
  // as the inner ct-button's aria-label) is its only possible accessible name.
  test.describe('1.1.1 / 4.1.2 — icon-only accessible name via `label`', () => {
    test('FAILS link-name when label is emptied out', async ({ page }) => {
      await setComponentProps(page, TAG, { label: '' });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES link-name with the default label', async ({ page }) => {
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
