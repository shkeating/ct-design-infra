// Enforces wcag-data/breadcrumb.json's `Conditional` entries that are
// actually testable on an isolated <ct-breadcrumb>. breadcrumb.json carries
// the same generic boilerplate list shared across most components, but
// 2.4.4 Link Purpose is genuinely applicable — a breadcrumb trail is
// entirely composed of links, whose text (each `ct-breadcrumb-item`'s
// `text`) is directly implementer-supplied.
//
// This only partially converts, and only via one specific rendering path.
// breadcrumb.ts renders most crumbs as a nested `<ct-link>` (see
// `renderCrumbLink`) — a separate custom element with its own shadow root,
// which the mechanical rules.mjs 2.4.4 extractor's `root.querySelectorAll("a")`
// can't see (it only queries the *host's own* shadow root; it doesn't pierce
// a nested custom element's shadow boundary the way axe-core's shadow-aware
// traversal does). The one exception is the final "active" crumb when
// `active-is-link` is set and that crumb has a `url`: `renderActiveCrumb`
// renders a *raw* `<a>` directly in `ct-breadcrumb`'s own shadow root (see
// its doc comment — "styled identically... but still marked
// aria-current="location" either way"), which the extractor can see and
// evaluate. That's the only crumb this file can actually enforce text
// quality on; the rest of the trail's link-text quality is only checkable
// via `ct-link`'s own conditional tests (see link.a11y-conditional.e2e.ts)
// applied to a `ct-link` instance directly, not through `ct-breadcrumb`.
//
// Uses `setLightDomChildren` (not `setComponentProps`) because
// `ct-breadcrumb` reads its `ct-breadcrumb-item` children as plain data
// inside its own `render()`, not as Lit-observed reactive children — see
// that helper's doc comment in a11y-conditional-helpers.ts.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, setLightDomChildren, runExtractor, extractorPassed } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-breadcrumb';

test.describe('ct-breadcrumb WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'breadcrumb', TAG);
    await setComponentProps(page, TAG, { activeIsLink: true });
  });

  // wcag-data/breadcrumb.json: 2.4.4 Link Purpose (In Context) — the final
  // "active" crumb, rendered as a raw <a> only when `active-is-link` is set
  // and that crumb has a `url` (see class doc comment above).
  test.describe('2.4.4 Link Purpose — active-is-link final crumb text', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setLightDomChildren(page, TAG, 'ct-breadcrumb-item', [
        { text: 'Home', url: '/' },
        { text: 'Click here', url: '/current' },
      ]);
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setLightDomChildren(page, TAG, 'ct-breadcrumb-item', [
        { text: 'Home', url: '/' },
        { text: 'Quarterly budget report', url: '/current' },
      ]);
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
