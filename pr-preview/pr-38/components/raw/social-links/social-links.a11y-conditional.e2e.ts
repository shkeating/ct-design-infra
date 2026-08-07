// Enforces wcag-data/social-links.json's `Conditional` entries that are
// actually testable on an isolated <ct-social-links>. social-links.json
// carries the same generic boilerplate list shared across most components,
// but social-links-item.ts's own doc comment identifies a real, constructible
// gap directly: "the rendered button is icon-only with no visible text of
// its own — omitting [linkTitle] leaves the link without an accessible
// name." Each `ct-social-links-item` light-DOM child's `linkTitle` becomes a
// visually-hidden <span> slotted into the underlying icon-only `ct-button`
// (contributing to its accessible name via normal slotted-content
// computation) — the same icon-only-accessible-name pattern already
// established for button/link/tooltip, here via a slotted span instead of
// an `aria-label` prop. The component's own `custom-icon`/`no-title` Fractal
// variants already demonstrate both states, which is a good sign this gap
// was deliberately designed around rather than accidental.
//
// `ct-button` renders here with `kind="link"` (a real destination URL, no
// form submission), so it renders as an `<a>`, not a `<button>` — the axe
// rule that actually fires is `link-name`, not `button-name` (confirmed by
// running this against both; `button-name` produced zero findings since
// there's no `<button>` element in the rendered DOM at all).
//
// Uses `setLightDomChildren` (not `setComponentProps`) because
// `ct-social-links` reads its `ct-social-links-item` children as plain data
// inside its own `render()`, not as Lit-observed reactive children — see
// that helper's doc comment in a11y-conditional-helpers.ts.
//
// Not converted: the rest of social-links.json's boilerplate entries
// (link purpose, page language, form labels, status messages) describe
// page/app-level concerns or don't match this component's actual rendered
// shape, same rationale established throughout this tier.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setLightDomChildren, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-social-links';

test.describe('ct-social-links WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'social-links', TAG);
  });

  // wcag-data/social-links.json: 4.1.2 Name, Role, Value — each icon-only
  // link button's accessible name comes entirely from its item's
  // `linkTitle`.
  test.describe('4.1.2 Name, Role, Value — icon-only link accessible name', () => {
    test('FAILS axe link-name when an item has no linkTitle', async ({ page }) => {
      await setLightDomChildren(page, TAG, 'ct-social-links-item', [{ icon: 'facebook', url: 'https://www.facebook.com' }]);
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe link-name when the item sets a descriptive linkTitle', async ({ page }) => {
      await setLightDomChildren(page, TAG, 'ct-social-links-item', [
        { icon: 'facebook', url: 'https://www.facebook.com', linkTitle: 'Facebook' },
      ]);
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
