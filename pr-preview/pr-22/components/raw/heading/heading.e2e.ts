import { test, expect } from '@playwright/test';

test.describe('ct-heading Visual Regression', () => {
  test('matches default (h1) visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/heading');
    await page.waitForFunction(() => customElements.get('ct-heading') !== undefined);
    await expect(page).toHaveScreenshot('heading-default.png');
  });

  test('matches level-3 visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/heading--level-3');
    await page.waitForFunction(() => customElements.get('ct-heading') !== undefined);
    await expect(page).toHaveScreenshot('heading-level-3.png');
  });

  test('matches level-6 visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/heading--level-6');
    await page.waitForFunction(() => customElements.get('ct-heading') !== undefined);
    await expect(page).toHaveScreenshot('heading-level-6.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/heading--dark');
    await page.waitForFunction(() => customElements.get('ct-heading') !== undefined);
    await expect(page).toHaveScreenshot('heading-dark.png');
  });

  test('renders the correct heading tag for its level', async ({ page }) => {
    await page.goto('/components/preview/heading--level-6');
    await page.waitForFunction(() => customElements.get('ct-heading') !== undefined);
    const h6 = page.locator('ct-heading h6');
    await expect(h6).toHaveCount(1);
  });
});
