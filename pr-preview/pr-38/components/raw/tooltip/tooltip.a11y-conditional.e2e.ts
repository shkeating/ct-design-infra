// Enforces wcag-data/tooltip.json's `Conditional` entries that are actually
// testable on an isolated <ct-tooltip>. Unlike most components in this tier,
// tooltip.json is already bespoke — it correctly notes the Zag.js machine
// wires role/state (role="tooltip", aria-describedby, data-state)
// automatically, which is closer to a Pass than a Conditional for those
// mechanics. What it doesn't fully spell out, but is still a real,
// constructible gap under 4.1.2 Name, Role, Value: the trigger is always
// rendered icon-only (tooltip.ts's `render()` — a raw <button> containing
// only a <ct-icon>, no visible text), and its accessible name comes
// entirely from the `label` prop via `aria-label=${ifDefined(this.label ||
// undefined)}`. When `label` is empty, `ifDefined` omits the attribute
// entirely and the trigger has no accessible name at all — the same
// icon-only pattern already established for button/link's `aria-label`
// passthrough, just via a prop tooltip already had rather than one that
// needed adding.
//
// Not converted:
//   - 1.1.1 (trigger icon) — tooltip.json itself notes the icon is always
//     `aria-hidden`, matching ct-icon's own always-decorative behavior (see
//     icon.a11y-conditional.e2e.ts); not a reachable failure state.
//   - 1.4.10 (fixed popup width) / 2.5.8 (trigger hit area) — visual/layout
//     measurements, not something the current text-kind extractors check.
//   - 2.4.6 (label/content clarity) — `content`/`label` render as plain
//     text in the popup and trigger, not `<label>`/`<legend>` elements, so
//     the mechanical rules.mjs 2.4.6 extractor (label/legend text only)
//     doesn't apply — the same structural gap noted for ct-heading.
//   - 3.1.2 / 3.2.4 — page/app-level language and cross-site consistency
//     concerns, same rationale established throughout this tier.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-tooltip';

test.describe('ct-tooltip WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'tooltip', TAG);
  });

  // wcag-data/tooltip.json: 4.1.2 Name, Role, Value — the icon-only
  // trigger's accessible name comes entirely from `label`.
  test.describe('4.1.2 Name, Role, Value — icon-only trigger accessible name', () => {
    test('FAILS axe button-name when label is empty', async ({ page }) => {
      await setComponentProps(page, TAG, { label: '' });
      const findings = await runAxeFor(page, TAG, 'button-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe button-name when label provides a descriptive accessible name', async ({ page }) => {
      await setComponentProps(page, TAG, { label: 'More information about this section' });
      const findings = await runAxeFor(page, TAG, 'button-name');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
