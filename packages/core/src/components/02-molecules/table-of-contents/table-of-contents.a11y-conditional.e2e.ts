// Enforces wcag-data/table-of-contents.json's `Conditional` entries that are
// actually testable on an isolated <ct-table-of-contents>.
//
// 2.4.4 Link Purpose (In Context) is genuinely applicable and testable: every
// link renders as a raw <a class="ct-table-of-contents__link"> directly in
// this component's own shadow root (not through a nested custom element like
// ct-link/ct-button), so the mechanical rules.mjs "2.4.4" extractor — which
// only queries the target tag's *own* shadow root — can actually see the
// text. Uses `setLightDomChildren` (not `setComponentProps`) because
// `ct-table-of-contents` reads its `ct-table-of-contents-item` children as
// plain data inside its own `render()`, not as Lit-observed reactive
// children — see that helper's doc comment in a11y-conditional-helpers.ts.
//
// 2.4.6 Headings and Labels has NO testable subset here, and is deliberately
// left unenforced: the mechanical "2.4.6" rule (see rules.mjs's own comment
// on that rule) only ever evaluates `label`/`legend` text for genericness,
// treating any heading purely as *context* for a label/legend that follows
// it — a heading's own text is never itself checked. This component's only
// rendered text besides link text is its optional `heading` (`<h2>`), so
// there is no label/legend for the mechanical rule to evaluate; it would
// short-circuit to a vacuous PASS regardless of how vague `heading` is. The
// interactive `2.4.6-review` rule *does* judge heading text directly — use
// `audit-component.mjs table-of-contents` for a real check of `heading`
// quality instead of a mechanical assertion here.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setLightDomChildren, runExtractor, extractorPassed } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-table-of-contents';

test.describe('ct-table-of-contents WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'table-of-contents', TAG);
  });

  // wcag-data/table-of-contents.json: 2.4.4 Link Purpose (In Context) —
  // each link's text (a `ct-table-of-contents-item`'s `text`) is directly
  // implementer-supplied.
  test.describe('2.4.4 Link Purpose — link text', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setLightDomChildren(page, TAG, 'ct-table-of-contents-item', [
        { text: 'Click here', url: '#section-1' },
        { text: 'Read more', url: '#section-2' },
      ]);
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setLightDomChildren(page, TAG, 'ct-table-of-contents-item', [
        { text: 'Configuring authentication settings', url: '#configuring-authentication-settings' },
        { text: 'Managing user permissions', url: '#managing-user-permissions' },
      ]);
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
