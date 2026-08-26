// Enforces wcag-data/field.json's `Conditional` entries that are actually
// testable on an isolated <ct-field>.
//
// 4.1.2 Name, Role, Value is the one entry with a genuinely constructible
// pass/fail pair at ct-field's own level: unlike ct-textfield/ct-select/
// ct-input in isolation (each entirely dependent on the implementer
// separately setting aria-label), ct-field automatically mirrors `title`
// (falling back to `label`) onto the rendered control's own `aria-label`
// whenever it has one to mirror (see field.ts's class doc). That only fails
// to produce an accessible name when BOTH `title` and `label` are empty —
// axe-core's `label` rule (the same rule textfield/checkbox's own
// conditional specs already use) is the authority for accessible-name
// *presence* here, same as every other form-control atom's own spec.
//
// Checked empirically per SKILL.md's own note: `rules.mjs`'s mechanical
// "4.1.2"/"3.3.2" text extractors query `host.shadowRoot.querySelectorAll(
// "input, textarea, select"/"button, a, ...")` directly — but ct-field's own
// shadow root never contains a raw <input>/<textarea>/<select>, only nested
// custom elements (ct-textfield/ct-select/etc.) that render their own real
// control one shadow-root level further down. Both mechanical extractors
// silently find nothing on ct-field itself, the same "nested custom element
// blocks the mechanical extractor" gap SKILL.md documents for
// callout/next-steps/attachment's nested ct-heading/ct-link content — axe's
// own accessibility-tree traversal is what actually pierces the nested
// shadow roots correctly, which is why `runAxeFor` is used below instead.
//
// 2.4.6 Headings and Labels / 2.5.3 Label in Name (title/label text
// quality) are NOT converted here, for the same reason checkbox/radio's own
// specs skip them: the title/legend text is rendered by a nested <ct-label>
// into ITS OWN separate shadow root, which the mechanical `runExtractor`
// text-quality rules cannot see into either. label.a11y-conditional.e2e.ts
// already covers that text-quality judgment at ct-label's own level; there
// is no separate testable subset of it at ct-field's level.
//
// 3.3.3 Error Suggestion (the invalid-state fallback message only naming
// *that* an error exists, not *what* to fix) and 4.1.3 Status Messages (no
// aria-live region on the field-message) have no matching mechanical
// rules.mjs extractor to enforce a pass/fail distinction against — both are
// better suited to `audit-component.mjs field`'s interactive judgment than a
// CI assertion.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-field';

test.describe('ct-field WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'field', TAG);
  });

  // wcag-data/field.json: 4.1.2 Name, Role, Value — "a titled ct-field
  // always has a correct accessible name by default... [unless] an untitled
  // single checkbox/radio with no label" (or, equally, an untitled
  // textfield/textarea/select/input-passthrough control).
  test.describe('4.1.2 — accessible name mirrored from title/label onto the rendered control', () => {
    test('FAILS axe "label" when both title and label are empty', async ({ page }) => {
      // Matches textfield.a11y-conditional.e2e.ts's own gotcha: `placeholder`
      // is itself a valid last-resort accessible-name source for <input>, so
      // it must also be cleared here or axe reports a false PASS via that
      // fallback — the default Fractal preview context sets one for demo
      // purposes.
      await setComponentProps(page, TAG, { title: '', label: '', placeholder: '' });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe "label" once title is set (mirrored onto the control automatically)', async ({ page }) => {
      await setComponentProps(page, TAG, { title: 'Full name', label: '', placeholder: '' });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });

    test('PASSES axe "label" via label alone for a single checkbox with no title', async ({ page }) => {
      await setComponentProps(page, TAG, {
        type: 'checkbox',
        title: '',
        label: 'I agree to the terms and conditions',
        placeholder: '',
      });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
