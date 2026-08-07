import { test, expect } from '@playwright/test';

test.describe('ct-radio Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/radio');

    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-radio') !== undefined);

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('radio-default.png');
  });

  test('checked variant matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/radio--checked');
    await page.waitForFunction(() => customElements.get('ct-radio') !== undefined);
    await expect(page).toHaveScreenshot('radio-checked.png');
  });

  test('invalid variant matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/radio--invalid');
    await page.waitForFunction(() => customElements.get('ct-radio') !== undefined);
    await expect(page).toHaveScreenshot('radio-invalid.png');
  });

  test('disabled variant matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/radio--disabled');
    await page.waitForFunction(() => customElements.get('ct-radio') !== undefined);
    await expect(page).toHaveScreenshot('radio-disabled.png');
  });

  test('dark variant matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/radio--dark');
    await page.waitForFunction(() => customElements.get('ct-radio') !== undefined);
    await expect(page).toHaveScreenshot('radio-dark.png');
  });
});
