// Enforces wcag-data/label.json's `Conditional` entries that are actually
// testable on an isolated <ct-label>. label.json is already bespoke (see
// CLAUDE.md's own callout of it as "a well-written example of a file that
// correctly marks its core criterion Pass instead of reflexively
// Conditional") — most of its Conditional entries (1.3.1, 2.1.1, 2.5.3,
// 4.1.2) are explicit about being the *implementer's* responsibility to wire
// up the `for`/`id` association to a control ct-label doesn't itself render,
// which an isolated component preview genuinely can't be pushed into a
// failing state for — the same class of "not reachable in isolation"
// conclusion tag.a11y-conditional.e2e.ts already documented for its own
// unreachable entries, not something worth forcing here either.
//
// One entry does convert cleanly: 2.4.6 Headings and Labels, on ct-label's
// own rendered <label>/<legend> text — exactly the element type the
// mechanical rules.mjs 2.4.6 extractor evaluates directly (see its own
// comment in rules.mjs: it only checks label/legend text, which is exactly
// what ct-label *is*, unlike ct-heading which renders a heading tag the
// same extractor never evaluates — see heading.a11y-conditional.e2e.ts).
//
// Same calibration gap already flagged for tag/chip (see
// tag.a11y-conditional.e2e.ts): the mechanical extractor's
// `text.split(" ").length < 3` check flags *any* label under three words,
// including plenty of normal, compliant field labels ("Name", "Email",
// "Phone") — the interactive audit skill's rubric already knows to PASS
// these (see wcag-rubrics.md's 2.4.6 section), but this CI tier has no
// model in the loop to apply that judgment. The compliant fixture below
// deliberately uses three-plus words to clear the heuristic, not because a
// shorter label would actually be non-compliant.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runExtractor, extractorPassed } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-label';

test.describe('ct-label WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'label', TAG);
  });

  // wcag-data/label.json: 2.4.6 Headings and Labels — "Compliance depends on
  // the implementer supplying `content` that specifically and clearly names
  // the associated field's purpose (e.g. 'Email address', not 'Field 3' or
  // a repeated generic string)."
  test.describe('2.4.6 Headings and Labels — label text clarity', () => {
    test('FAILS with a generic, single-word label', async ({ page }) => {
      await setComponentProps(page, TAG, { tag: 'label', content: 'Name', required: false });
      const result = await runExtractor(page, TAG, '2.4.6');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with a specific, multi-word label', async ({ page }) => {
      await setComponentProps(page, TAG, { tag: 'label', content: 'Preferred email address', required: false });
      const result = await runExtractor(page, TAG, '2.4.6');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
