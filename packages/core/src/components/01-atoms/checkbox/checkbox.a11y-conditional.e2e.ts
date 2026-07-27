// Enforces wcag-data/checkbox.json's `Conditional` entries that are actually
// testable on an isolated <ct-checkbox>.
//
// 1.3.1 Info and Relationships / 3.3.2 Labels or Instructions / 4.1.2 Name,
// Role, Value — all three converge on the same practical mechanism:
// ct-checkbox's accessible name comes from `aria-label`, which defaults to
// the `label` prop's text when not explicitly set (see checkbox.ts's class
// doc for why the composed ct-label's native for/id association can't
// supply it instead — its rendered <label> lives in its own nested shadow
// root, one level deeper than the sibling-shadow-root case documented in
// wcag-data/input.json). Checked empirically, the same way
// input.a11y-conditional.e2e.ts did: axe-core's `label` rule ("Ensure every
// form element has a label") is what fires for an unlabeled checkbox, not a
// checkbox-specific rule id.
//
// 2.4.6 Headings and Labels and 2.5.3 Label in Name are NOT converted here.
// Both concern the *quality*/consistency of the visible label text, but that
// text is rendered by the composed <ct-label> into ITS OWN shadow root,
// nested inside ct-checkbox's shadow root — the mechanical rules.mjs
// extractors (`runExtractor`) only query the target tag's own shadow root
// and cannot see into a nested custom element's separate one (see the
// "Nested custom elements block the mechanical text-quality extractors"
// note in .claude/skills/add-component/SKILL.md). Running `runExtractor`
// against `ct-checkbox` for '2.4.6' silently finds nothing to evaluate,
// which is not a real pass — it's the same class of gap
// callout/next-steps/attachment already document for their own nested
// ct-heading/ct-link content. ct-label's own text-quality coverage already
// exists in label.a11y-conditional.e2e.ts; there is no separate testable
// subset at ct-checkbox's own level for either criterion.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-checkbox';

test.describe('ct-checkbox WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'checkbox', TAG);
  });

  // wcag-data/checkbox.json: 1.3.1 Info and Relationships / 3.3.2 Labels or
  // Instructions / 4.1.2 Name, Role, Value — "with both [label and
  // aria-label] empty, the control has no accessible name at all."
  test.describe('1.3.1 / 3.3.2 / 4.1.2 — accessible name defaults from label, absent when both are empty', () => {
    test('FAILS axe "label" rule when both label and aria-label are empty', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'terms', id: 'terms', label: '', ariaLabel: null });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe "label" rule by default once label is set (no explicit aria-label needed)', async ({ page }) => {
      await setComponentProps(page, TAG, {
        name: 'terms',
        id: 'terms',
        label: 'I agree to the terms and conditions',
        ariaLabel: null,
      });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });

    test('PASSES axe "label" rule when only an explicit aria-label is set', async ({ page }) => {
      await setComponentProps(page, TAG, {
        name: 'terms',
        id: 'terms',
        label: '',
        ariaLabel: 'Accept terms and conditions',
      });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
