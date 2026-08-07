import { test, expect } from '@playwright/test';

test.describe('ct-field-message Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/field-message');

    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-field-message') !== undefined);

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('field-message-default.png');
  });

  test('matches warning visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field-message--warning');
    await page.waitForFunction(() => customElements.get('ct-field-message') !== undefined);
    await expect(page).toHaveScreenshot('field-message-warning.png');
  });

  test('matches error visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field-message--error');
    await page.waitForFunction(() => customElements.get('ct-field-message') !== undefined);
    await expect(page).toHaveScreenshot('field-message-error.png');
  });

  test('matches success visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field-message--success');
    await page.waitForFunction(() => customElements.get('ct-field-message') !== undefined);
    await expect(page).toHaveScreenshot('field-message-success.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field-message--dark');
    await page.waitForFunction(() => customElements.get('ct-field-message') !== undefined);
    await expect(page).toHaveScreenshot('field-message-dark.png');
  });
});
