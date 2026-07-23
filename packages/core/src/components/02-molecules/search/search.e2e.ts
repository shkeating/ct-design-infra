import { test, expect } from '@playwright/test';

test.describe('ct-search Visual Regression', () => {
  test('default', async ({ page }) => {
    await page.goto('/components/preview/search');
    await page.waitForFunction(() => customElements.get('ct-search') !== undefined);
    await expect(page).toHaveScreenshot('search-default.png');
  });

  test('dark', async ({ page }) => {
    await page.goto('/components/preview/search--dark');
    await page.waitForFunction(() => customElements.get('ct-search') !== undefined);
    await expect(page).toHaveScreenshot('search-dark.png');
  });

  test('modifier-class', async ({ page }) => {
    await page.goto('/components/preview/search--modifier-class');
    await page.waitForFunction(() => customElements.get('ct-search') !== undefined);
    await expect(page).toHaveScreenshot('search-modifier-class.png');
  });
});
