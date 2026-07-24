import { test, expect } from '@playwright/test';

test.describe('ct-field-description Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/field-description');

    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-field-description') !== undefined);

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('field-description-default.png');
  });

  test('matches large size visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field-description--large');
    await page.waitForFunction(() => customElements.get('ct-field-description') !== undefined);
    await expect(page).toHaveScreenshot('field-description-large.png');
  });

  // No screenshot test for the `dark` variant: like `ct-label`, this component
  // paints only text color, never a background (matching the upstream
  // reference CSS), and the Fractal preview page background is always light
  // regardless of the `theme` context — see label.config.json/label.e2e.ts
  // for the same precedent. The `dark` variant stays in field-description.
  // config.json for Fractal browsing and verify-component's computed-style
  // check, which does confirm the correct color token resolves.
});
