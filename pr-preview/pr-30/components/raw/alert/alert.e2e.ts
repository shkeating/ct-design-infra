import { test, expect } from '@playwright/test';

test.describe('ct-alert Visual Regression', () => {
  test('matches default (information) visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/alert');
    await page.waitForFunction(() => customElements.get('ct-alert') !== undefined);
    await expect(page).toHaveScreenshot('alert-default.png');
  });

  test('matches warning visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/alert--warning');
    await page.waitForFunction(() => customElements.get('ct-alert') !== undefined);
    await expect(page).toHaveScreenshot('alert-warning.png');
  });

  test('matches error visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/alert--error');
    await page.waitForFunction(() => customElements.get('ct-alert') !== undefined);
    await expect(page).toHaveScreenshot('alert-error.png');
  });

  test('matches success visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/alert--success');
    await page.waitForFunction(() => customElements.get('ct-alert') !== undefined);
    await expect(page).toHaveScreenshot('alert-success.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/alert--dark');
    await page.waitForFunction(() => customElements.get('ct-alert') !== undefined);
    await expect(page).toHaveScreenshot('alert-dark.png');
  });

  test('matches no-dismiss visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/alert--no-dismiss');
    await page.waitForFunction(() => customElements.get('ct-alert') !== undefined);
    await expect(page).toHaveScreenshot('alert-no-dismiss.png');
  });

  test('dismisses on button click', async ({ page }) => {
    await page.goto('/components/preview/alert');
    await page.waitForFunction(() => customElements.get('ct-alert') !== undefined);

    const alert = page.locator('ct-alert');
    await expect(alert.locator('.ct-alert')).toHaveCount(1);

    const dismissButton = alert.locator('ct-button');
    await dismissButton.locator('button').click();

    await expect(alert.locator('.ct-alert')).toHaveCount(0);
  });
});
