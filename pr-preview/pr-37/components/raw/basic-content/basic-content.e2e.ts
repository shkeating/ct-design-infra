import { test, expect } from '@playwright/test';

test.describe('ct-basic-content Visual Regression', () => {
  test('matches default visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/basic-content');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    await expect(page).toHaveScreenshot('basic-content-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/basic-content--dark');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    await expect(page).toHaveScreenshot('basic-content-dark.png');
  });

  test('matches with-background visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/basic-content--with-background');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    await expect(page).toHaveScreenshot('basic-content-with-background.png');
  });

  test('matches flush visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/basic-content--flush');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    await expect(page).toHaveScreenshot('basic-content-flush.png');
  });

  test('matches table visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/basic-content--table');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    await expect(page).toHaveScreenshot('basic-content-table.png');
  });

  test('matches ordered-list visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/basic-content--ordered-list');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    await expect(page).toHaveScreenshot('basic-content-ordered-list.png');
  });

  test('renders the container wrapper by default', async ({ page }) => {
    await page.goto('/components/preview/basic-content');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    const container = page.locator('ct-basic-content .ct-basic-content__container');
    await expect(container).toHaveCount(1);
  });

  test('omits the container wrapper when flush', async ({ page }) => {
    await page.goto('/components/preview/basic-content--flush');
    await page.waitForFunction(() => customElements.get('ct-basic-content') !== undefined);
    const container = page.locator('ct-basic-content .ct-basic-content__container');
    await expect(container).toHaveCount(0);
  });
});
