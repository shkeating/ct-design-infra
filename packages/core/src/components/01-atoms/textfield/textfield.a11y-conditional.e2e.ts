// Enforces wcag-data/textfield.json's `Conditional` entries that are
// actually testable on an isolated <ct-textfield>.
//
// textfield.json's 1.3.1/2.4.6/3.3.2/4.1.2 entries all boil down to the same
// underlying fact: ct-textfield renders only the <input> itself, never a
// label, so its accessible *name* depends entirely on the implementer either
// pairing an external `for`/`id`-matched label or setting `aria-label`
// directly. That's a real, constructible pass/fail pair — axe-core's `label`
// rule (mapped in axe-earl-map.json to 3.3.2 Labels or Instructions, which
// textfield.json's 4.1.2 entry also documents) fires precisely on a form
// field with no accessible name.
//
// 2.5.3 Label in Name is *not* converted here, unlike button/link's version
// of the same entry: button/link/tag always render their own visible text
// that an aria-label could contradict, but ct-textfield never renders visible
// label text of its own (see 1.3.1) — there is nothing on the component
// itself for an aria-label to "contain", so this component in isolation can't
// be pushed into a constructible 2.5.3 failure the way an icon-only button
// can. See label.a11y-conditional.e2e.ts for the same class of reasoning.
//
// 1.4.1 Use of Color (the invalid state relying on color alone without a
// paired ct-field-message) has no matching `rules.mjs` "text-mechanical"
// extractor — its only rules.mjs entry is `kind: "text"`, which needs a model
// in the loop (see SKILL.md's "Never import rules.mjs/audit-engine.mjs
// directly" guidance) — so it isn't enforced here either;
// `audit-component.mjs textfield` is the accurate way to check it.
import { test, expect } from '@playwright/test';
import { gotoComponentPreview, setComponentProps, runAxeFor } from '../../../test-support/a11y-conditional-helpers.js';

const TAG = 'ct-textfield';

test.describe('ct-textfield WCAG conditional enforcement', () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponentPreview(page, 'textfield', TAG);
  });

  // wcag-data/textfield.json: 4.1.2 Name, Role, Value / 3.3.2 Labels or
  // Instructions — "the field has no accessible name at all" without a
  // paired label or aria-label.
  //
  // Calibration note: per HTML-AAM, `placeholder` is a valid last-resort
  // accessible-name source for <input> (label > aria-label > title >
  // placeholder), and axe-core's `label` rule honors that fallback — so the
  // failing fixture below must also clear `placeholder` (and `id`, in case a
  // stray `for`-matched label exists elsewhere on the page), not just
  // `ariaLabel`, or axe reports PASS via the placeholder fallback even though
  // there's no real label. This component's default Fractal preview context
  // sets a `placeholder` for demo purposes, which is exactly what masked this
  // the first time this test was written — don't reuse the default context's
  // placeholder when constructing the "no accessible name" fixture.
  test.describe('4.1.2 / 3.3.2 — accessible name presence', () => {
    test('FAILS axe "label" when the field has no aria-label, placeholder, or paired label', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'email', ariaLabel: null, placeholder: '', id: '' });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(true);
    });

    test('PASSES axe "label" when aria-label is set', async ({ page }) => {
      await setComponentProps(page, TAG, { name: 'email', ariaLabel: 'Email address', placeholder: '', id: '' });
      const findings = await runAxeFor(page, TAG, 'label');
      expect(findings.some((f) => f.verdict === 'FAIL')).toBe(false);
      expect(findings.some((f) => f.verdict === 'PASS')).toBe(true);
    });
  });
});
