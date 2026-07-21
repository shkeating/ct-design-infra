import { test, expect } from '@playwright/test';

test.describe('ct-item-list Visual Regression', () => {
  test('matches default (horizontal, regular) visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/item-list');
    await page.waitForFunction(() => customElements.get('ct-item-list') !== undefined);
    await expect(page).toHaveScreenshot('item-list-default.png');
  });

  test('matches vertical visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/item-list--vertical');
    await page.waitForFunction(() => customElements.get('ct-item-list') !== undefined);
    await expect(page).toHaveScreenshot('item-list-vertical.png');
  });

  test('matches small size visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/item-list--small');
    await page.waitForFunction(() => customElements.get('ct-item-list') !== undefined);
    await expect(page).toHaveScreenshot('item-list-small.png');
  });

  test('matches large size visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/item-list--large');
    await page.waitForFunction(() => customElements.get('ct-item-list') !== undefined);
    await expect(page).toHaveScreenshot('item-list-large.png');
  });

  test('matches no-gap visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/item-list--no-gap');
    await page.waitForFunction(() => customElements.get('ct-item-list') !== undefined);
    await expect(page).toHaveScreenshot('item-list-no-gap.png');
  });
});
