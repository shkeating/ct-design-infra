// Enforces wcag-data/video-player.json's `Conditional` entries that are actually testable on
// a live <ct-video-player> instance. Most of that file's list is either page/app-level
// boilerplate (same out-of-scope concerns established across every component's file) or a
// concern this component genuinely draws a boundary around (embedded-content keyboard traps,
// caption support - see the file's own observations), so this tier only converts the one entry
// that survives both bars from step 6 of SKILL.md:
//
// 1. 4.1.2 Name, Role, Value - the icon-only transcript link. `ct-video-player` always renders
//    the transcript link with a leading `eye` icon (`icon-placement: 'before'`); a
//    `transcript-url` set without `transcript-text` produces an icon-only `ct-link` with no
//    accessible name unless `transcript-aria-label` (an addition this port made to
//    `ct-video-player` itself - see class doc comment) is also set. Uses `runAxeFor` against
//    the outer `ct-video-player` tag with axe's `link-name` rule.
//
// Two near-misses were investigated and found NOT testable here, each for a different reason:
//
// - 2.4.1 Bypass Blocks / (the `frame-title` portion of) 4.1.2 - the embedded-source path's
//   `frame-title` passthrough to `ct-iframe`'s own `title` attribute would be the obvious
//   axe-based check (axe ships a `frame-title` rule), but that rule id is not currently in
//   `.claude/skills/sonnet-a11y-audit/references/axe-earl-map.json`, so `runAxeFor` can never
//   surface it (that helper filters against `runAxePhase`'s findings, which are themselves
//   pre-filtered against that map - see `audit-engine.mjs`'s `mapAxeResults`). This is a
//   pre-existing rules.mjs/axe-earl-map coverage gap, not something this component's own props
//   can fix - `wcag-data/iframe.json` documents the identical dependency without a test file of
//   its own for the same reason. Flagged, not fixed inline, per SKILL.md.
// - 2.4.4 Link Purpose - the transcript link's text quality (e.g. rejecting "Click here") is a
//   real concern, but not reachable from `ct-video-player`'s own level: the text renders
//   through a nested `<ct-link>`, a separate shadow root the mechanical rules.mjs `2.4.4`
//   extractor's `root.querySelectorAll('a')` cannot see (it only queries the *target tag's own*
//   shadow root - same limitation `breadcrumb`/`callout`/`attachment`/`next-steps` document).
//   Already covered generically by `ct-link`'s own `link.a11y-conditional.e2e.ts`.
//
// (Confirmed empirically, not assumed: axe-core's own `link-name` check DOES correctly reach
// through the same two-level shadow nesting - `ct-video-player` → `ct-link` → its `<a>` - since
// axe's traversal is shadow-DOM-aware in a way the plain-DOM rules.mjs text extractors are not.
// That asymmetry is exactly why 4.1.2/link-name is testable here while 2.4.4 is not, even
// though both concern the same nested element.)
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-video-player';

test.describe('ct-video-player WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'video-player', TAG);
  });

  // wcag-data/video-player.json: 4.1.2 Name, Role, Value - icon-only transcript link.
  test.describe('4.1.2 Name, Role, Value — icon-only transcript link accessible name', () => {
    test('FAILS axe link-name when the transcript link has no name source', async ({ page }) => {
      await setComponentProps(page, TAG, {
        transcriptUrl: 'https://example.com/transcript',
        transcriptText: '',
        transcriptTitle: null,
        transcriptAriaLabel: null,
        transcriptNewWindow: false,
        transcriptExternal: false,
      });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe link-name when transcript-aria-label is set', async ({ page }) => {
      await setComponentProps(page, TAG, {
        transcriptUrl: 'https://example.com/transcript',
        transcriptText: '',
        transcriptTitle: null,
        transcriptAriaLabel: 'View video transcript',
        transcriptNewWindow: false,
        transcriptExternal: false,
      });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });

    test('PASSES axe link-name when transcript-text (visible label) is set instead', async ({ page }) => {
      await setComponentProps(page, TAG, {
        transcriptUrl: 'https://example.com/transcript',
        transcriptText: 'View transcript',
        transcriptTitle: null,
        transcriptAriaLabel: null,
        transcriptNewWindow: false,
        transcriptExternal: false,
      });
      const findings = await runAxeFor(page, TAG, 'link-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
