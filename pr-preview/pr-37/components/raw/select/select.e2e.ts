import { test, expect } from '@playwright/test';

test.describe('ct-select Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/select');
    await page.waitForFunction(() => customElements.get('ct-select') !== undefined);
    await expect(page).toHaveScreenshot('select-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/select--dark');
    await page.waitForFunction(() => customElements.get('ct-select') !== undefined);
    await expect(page).toHaveScreenshot('select-dark.png');
  });

  test('matches multiple visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/select--multiple');
    await page.waitForFunction(() => customElements.get('ct-select') !== undefined);
    await expect(page).toHaveScreenshot('select-multiple.png');
  });

  test('matches invalid visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/select--invalid');
    await page.waitForFunction(() => customElements.get('ct-select') !== undefined);
    await expect(page).toHaveScreenshot('select-invalid.png');
  });

  test('matches disabled visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/select--disabled');
    await page.waitForFunction(() => customElements.get('ct-select') !== undefined);
    await expect(page).toHaveScreenshot('select-disabled.png');
  });

  test('matches grouped visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/select--grouped');
    await page.waitForFunction(() => customElements.get('ct-select') !== undefined);
    await expect(page).toHaveScreenshot('select-grouped.png');
  });
});
