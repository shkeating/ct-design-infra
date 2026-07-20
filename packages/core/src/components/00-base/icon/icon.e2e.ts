import { test, expect } from '@playwright/test';

test.describe('ct-icon Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/icon');

    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-icon') !== undefined);

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('icon-default.png');
  });

  test('gallery variant matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/icon--gallery');
    await page.waitForFunction(() => customElements.get('ct-icon') !== undefined);
    await expect(page).toHaveScreenshot('icon-gallery.png');
  });
});
