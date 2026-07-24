// Enforces wcag-data/tag.json's `Conditional` entries that are actually
// testable on an isolated <ct-tag>. Unlike button/link, tag only yields one:
// 2.4.4 Link Purpose (when `url` is set, tag renders an <a>). tag.json also
// marks 1.1.1/4.1.2/2.5.3 Conditional with the same boilerplate
// icon-only-accessible-name language button.json/link.json carry, but ct-tag
// can't actually be pushed into that shape — `label` is required for the
// component to render at all (`if (!this.label) return nothing`), so the
// visible label is always present and always equals the accessible name, and
// `icon` only ever renders alongside it, never in place of it. Those entries
// are closer to an always-Pass than a real Conditional for this component
// specifically — see button.a11y-conditional.e2e.ts for the general rationale
// on why not every Conditional entry gets a test here. Not something this
// file edits in wcag-data/tag.json itself (see SKILL.md: that requires a
// proposed diff and explicit confirmation).
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runExtractor, extractorPassed } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-tag';

test.describe('ct-tag WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'tag', TAG);
  });

  // wcag-data/tag.json: 2.4.4 Link Purpose (In Context) — "compliance depends
  // on the implementer providing clear and descriptive link text," applicable
  // once `url` makes the tag render as an <a>.
  //
  // Note: rules.mjs's 2.4.4 extractor flags any single-word link text as
  // generic (`wordCount <= 1`), a heuristic calibrated for prose links
  // ("click here" vs "read the full report"). A single-word category tag
  // (e.g. "Housing") is normal, compliant tag content — the word count alone
  // doesn't make it ambiguous in context — so the compliant fixture here
  // deliberately uses two words to clear that heuristic rather than because
  // one word would be non-compliant. If this tier expands to tag's other
  // real-world single-word usage, that heuristic likely needs a tag/chip-aware
  // carve-out in rules.mjs itself, not a workaround here.
  test.describe('2.4.4 Link Purpose — url-linked tag text', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Click here', url: '#' });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'Public safety', url: '#' });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
