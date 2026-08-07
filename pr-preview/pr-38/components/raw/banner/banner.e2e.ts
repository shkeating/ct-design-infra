import { test, expect } from '@playwright/test';

test.describe('ct-banner Visual Regression', () => {
  test('matches default (decorative, light, with featured + background image) visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/banner');
    await page.waitForFunction(() => customElements.get('ct-banner') !== undefined);
    await expect(page).toHaveScreenshot('banner-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/banner--dark');
    await page.waitForFunction(() => customElements.get('ct-banner') !== undefined);
    await expect(page).toHaveScreenshot('banner-dark.png');
  });

  test('matches no-featured-image visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/banner--no-featured-image');
    await page.waitForFunction(() => customElements.get('ct-banner') !== undefined);
    await expect(page).toHaveScreenshot('banner-no-featured-image.png');
  });

  test('matches no-background-image visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/banner--no-background-image');
    await page.waitForFunction(() => customElements.get('ct-banner') !== undefined);
    await expect(page).toHaveScreenshot('banner-no-background-image.png');
  });
});
