// Enforces wcag-data/table.json's `Conditional` entries that are actually
// testable on an isolated <ct-table>. Unlike button/link/tag, table.json is
// already bespoke (not the boilerplate copy-pasted across most components) —
// it correctly identifies that `header`/`rows`/`footer` are trusted,
// implementer-supplied HTML strings rendered via `unsafeHTML` (see
// table.ts's class doc comment), so any accessibility defect embedded in
// that HTML is real, constructible, and this component's own responsibility
// to not silently accept.
//
// Two entries convert cleanly because they reuse mechanisms already proven
// out for button/link/tag:
//   - 1.1.1 Non-text Content: an <img> embedded in `rows` with no alt text
//     is exactly what axe's `image-alt` rule already catches — same
//     "axe is the authority for accessible-name presence" reasoning
//     button.a11y-conditional.e2e.ts used for icon-only buttons.
//   - 2.4.4 Link Purpose: an <a> embedded in `rows` with generic text is
//     exactly what rules.mjs's 2.4.4 extractor already flags, since it
//     queries `root.querySelectorAll("a")` against the shadow root
//     regardless of whether those anchors came from the component's own
//     template or from `unsafeHTML`-injected content.
//
// Not converted, with reasons:
//   - 1.3.1 (single-row header wrapping) — table.json notes this case is
//     "handled automatically," i.e. closer to an always-Pass for the shape
//     ct-table actually supports than a real Conditional; the multi-row
//     `scope`-attribute case it also gestures at would need axe's table
//     structural rules (e.g. `scope-attr-valid`) exercised against harder
//     multi-row fixtures, left as a possible follow-up rather than guessed at here.
//   - 1.4.5 (images of text) — same "requires judging content quality, not
//     just structure" problem noted for button/link/tag; no rule here can
//     tell a photographed sentence from a photo of a person.
//   - 1.4.10 / 2.4.3 — table.json itself describes these as automatic given
//     the component's actual rendering (responsive stacked layout; DOM order
//     always matches visual order), not implementer-conditional.
//   - 2.4.6 (caption gives an accessible name) — not testable with the
//     current rules.mjs: its extractor only evaluates `label`/`legend`
//     element text for genericness, never a `<caption>`'s, and never a
//     heading tag's own text either (see heading.a11y-conditional.e2e.ts for
//     the full writeup of that gap). Flagged, not routed around here.
//   - 2.4.7 (focus visible on focusable cell content) — real and plausible,
//     but enforcing it needs the orchestrator's real focus-interaction/
//     computed-style-diff machinery (`runInteractivePhase` in
//     audit-engine.mjs), which a11y-conditional-helpers.ts doesn't currently
//     expose. Would need that helper extended first, not attempted here.
//   - 3.1.1 / 3.1.2 — page/app-level `lang` attribute concerns, same
//     rationale already established for button/link/tag.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runExtractor, extractorPassed, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-table';

test.describe('ct-table WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'table', TAG);
  });

  // wcag-data/table.json: 1.1.1 Non-text Content — "The table itself renders
  // no images. header/rows/footer are trusted HTML strings the implementer
  // supplies," so compliance depends on any embedded <img> having real alt
  // text.
  test.describe('1.1.1 Non-text Content — image embedded in rows HTML', () => {
    test('FAILS axe image-alt when an embedded row image has no alt', async ({ page }) => {
      await setComponentProps(page, TAG, {
        rows: '<tr><td data-title="Photo"><img src="/avatar.jpg"></td></tr>',
      });
      const findings = await runAxeFor(page, TAG, 'image-alt');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe image-alt when an embedded row image has descriptive alt text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        rows: '<tr><td data-title="Photo"><img src="/avatar.jpg" alt="Ada Lovelace\'s staff profile photo"></td></tr>',
      });
      const findings = await runAxeFor(page, TAG, 'image-alt');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });

  // wcag-data/table.json: 2.4.4 Link Purpose (In Context) — "Only relevant
  // when the implementer's header/rows/footer HTML embeds links; compliance
  // depends on those links having descriptive text."
  test.describe('2.4.4 Link Purpose — link embedded in rows HTML', () => {
    test('FAILS with generic link text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        rows: '<tr><td data-title="Profile"><a href="#">Click here</a></td></tr>',
      });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(false);
    });

    test('PASSES with descriptive link text', async ({ page }) => {
      await setComponentProps(page, TAG, {
        rows: '<tr><td data-title="Profile"><a href="#">Ada Lovelace\'s staff profile</a></td></tr>',
      });
      const result = await runExtractor(page, TAG, '2.4.4');
      expect(extractorPassed(result)).toBe(true);
    });
  });
});
