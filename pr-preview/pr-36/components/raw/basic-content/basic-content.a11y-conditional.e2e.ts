// Enforces wcag-data/basic-content.json's `Conditional` entries that are
// actually testable on an isolated <ct-basic-content>. Like table/paragraph,
// this component's `content` prop is trusted, implementer-supplied HTML
// rendered directly via `unsafeHTML` (see basic-content.ts's own doc
// comment and the default Fractal preview's rich `content` fixture), so an
// accessibility defect embedded in that HTML is real and constructible —
// the same reasoning already applied to table's `header`/`rows`/`footer`
// and paragraph's `content`.
//
// Two entries convert cleanly, reusing the exact mechanisms already proven
// for button/link/tag/table/paragraph:
//   - 1.1.1 Non-text Content: an <img> embedded in `content` with no alt
//     text is exactly what axe's `image-alt` rule already catches.
//   - 2.4.4 Link Purpose: an <a> embedded in `content` with generic text is
//     exactly what rules.mjs's mechanical 2.4.4 extractor already flags.
//
// Not converted, with reasons (mirrors paragraph.a11y-conditional.e2e.ts,
// since wcag-data/basic-content.json carries the same generic boilerplate
// list rather than paragraph.json's bespoke observations):
//   - 1.3.1 (heading levels/structure within `content`) — no structural
//     constraint this component imposes; nothing to assert against.
//   - 1.4.1 (color-only cues) / 1.4.5 (images of text) — require judging
//     content quality, not structure; the same "can't tell a photographed
//     sentence from a photo of a person" problem noted throughout this tier.
//   - 2.4.6 (headings inside `content`) — not testable with the current
//     mechanical rules.mjs extractor: it only evaluates `label`/`legend`
//     element text for genericness, never a heading's own text. See
//     heading.a11y-conditional.e2e.ts for the full writeup.
//   - 3.1.2 / 4.1.2 — page/app-level `lang` attribute and generic-wrapper-
//     role concerns, same rationale already established for the other atoms.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runExtractor, extractorPassed, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-basic-content';

test.describe('ct-basic-content WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'basic-content', TAG);
  });

  // wcag-data/basic-content.json: 1.1.1 Non-text Content — `content` is
  // trusted HTML that can embed an <img>; compliance depends on that image
  // having real alt text.
  test.describe('1.1.1 Non-text Content — image embedded in content HTML', () => {
    test('FAILS axe image-alt when an embedded content image has no alt', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: '<p>See the site map below.</p><img src="/sitemap.png">',
      });
      const findings = await runAxeFor(page, TAG, 'image-alt');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe image-alt when an embedded content image has descriptive alt text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: '<p>See the site map below.</p><img src="/sitemap.png" alt="Site map of the downtown civic campus">',
      });
      const findings = await runAxeFor(page, TAG, 'image-alt');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });

  // wcag-data/basic-content.json: 2.4.4 Link Purpose (In Context) —
  // compliance depends on the implementer providing descriptive link text
  // within `content`; the component does not alter or filter it.
  test.describe('2.4.4 Link Purpose — link embedded in content HTML', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: 'For more information, <a href="#">click here</a>.',
      });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        content: 'Read the <a href="#">accessibility policy in full</a> for details.',
      });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
