// Enforces wcag-data/paragraph.json's `Conditional` entries that are
// actually testable on an isolated <ct-paragraph>. Like table.json,
// paragraph.json is already bespoke (not the boilerplate copy-pasted across
// most components) — it correctly identifies that `content` is trusted,
// implementer-supplied HTML rendered directly (see paragraph.ts's own
// `content` prop doc comment and the `rich-content` Fractal variant), so an
// accessibility defect embedded in that HTML is real and constructible, the
// same reasoning table.a11y-conditional.e2e.ts already applied to
// `header`/`rows`/`footer`.
//
// Two entries convert cleanly, reusing the exact mechanisms already proven
// for button/link/tag/table:
//   - 1.1.1 Non-text Content: an <img> embedded in `content` with no alt
//     text is exactly what axe's `image-alt` rule already catches.
//   - 2.4.4 Link Purpose: an <a> embedded in `content` with generic text is
//     exactly what rules.mjs's mechanical 2.4.4 extractor already flags,
//     since it queries the shadow root regardless of whether the anchor
//     came from the component's own template or injected HTML.
//
// Not converted, with reasons:
//   - 1.3.1 (no structural constraint imposed on `content`) — this is
//     paragraph.json's own observation that the component *doesn't*
//     constrain heading levels/structure; there's nothing to assert against
//     since any structure the implementer's HTML has is by definition
//     "correct" from this component's point of view.
//   - 1.4.1 (links distinguished by underline as well as color) —
//     paragraph.json's own observation says this is already handled by the
//     ported `a:not(.ct-button):not(.ct-link)` CSS rule, i.e. closer to an
//     always-Pass for this component than a real Conditional. Not something
//     this file edits in wcag-data/paragraph.json itself without the user's
//     sign-off first.
//   - 1.4.5 (images of text) — requires judging image *content* quality,
//     the same "can't tell a photographed sentence from a photo of a
//     person" problem already noted for button/link/tag/table.
//   - 2.4.6 (headings inside `content`) — not testable with the current
//     mechanical rules.mjs extractor: it only evaluates `label`/`legend`
//     element text for genericness, never a heading's own text. See
//     heading.a11y-conditional.e2e.ts for the full writeup; the interactive
//     audit skill's newer `2.4.6-review` rule does check heading text, but
//     that rule needs Claude in the loop and isn't available to this plain
//     Playwright CI tier.
//   - 2.5.8 (inline link target size) — a visual/layout measurement, not
//     something the current text-kind extractors check.
//   - 3.1.2 / 4.1.2 — page/app-level `lang` attribute and generic-wrapper-
//     role concerns, same rationale already established for the other atoms.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runExtractor, extractorPassed, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-paragraph';

test.describe('ct-paragraph WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'paragraph', TAG);
  });

  // wcag-data/paragraph.json: 1.1.1 Non-text Content — "The `content` prop
  // is trusted, arbitrary HTML (headings, links, lists, images) supplied by
  // the implementer," so compliance depends on any embedded <img> having
  // real alt text.
  test.describe('1.1.1 Non-text Content — image embedded in content HTML', () => {
    test('FAILS axe image-alt when an embedded content image has no alt', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: '<p>See the chart below.</p><img src="/chart.png">',
      });
      const findings = await runAxeFor(page, TAG, 'image-alt');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe image-alt when an embedded content image has descriptive alt text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: '<p>See the chart below.</p><img src="/chart.png" alt="Quarterly revenue growth chart, trending upward">',
      });
      const findings = await runAxeFor(page, TAG, 'image-alt');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });

  // wcag-data/paragraph.json: 2.4.4 Link Purpose (In Context) — "Compliance
  // depends on the implementer providing descriptive link text within
  // `content`; the component does not alter or filter it."
  test.describe('2.4.4 Link Purpose — link embedded in content HTML', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: 'For the full breakdown, <a href="#">click here</a>.',
      });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: 'Read the <a href="#">quarterly budget breakdown</a> for full details.',
      });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
