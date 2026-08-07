import { test, expect } from '@playwright/test';

test.describe('ct-table Visual Regression', () => {
  test('matches default visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table');
    await page.waitForFunction(() => customElements.get('ct-table') !== undefined);
    await expect(page).toHaveScreenshot('table-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table--dark');
    await page.waitForFunction(() => customElements.get('ct-table') !== undefined);
    await expect(page).toHaveScreenshot('table-dark.png');
  });

  test('matches striped visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table--striped');
    await page.waitForFunction(() => customElements.get('ct-table') !== undefined);
    await expect(page).toHaveScreenshot('table-striped.png');
  });

  test('matches data-table visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table--data-table');
    await page.waitForFunction(() => customElements.get('ct-table') !== undefined);
    await expect(page).toHaveScreenshot('table-data-table.png');
  });

  test('matches caption-after visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table--caption-after');
    await page.waitForFunction(() => customElements.get('ct-table') !== undefined);
    await expect(page).toHaveScreenshot('table-caption-after.png');
  });

  test('matches no-footer visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table--no-footer');
    await page.waitForFunction(() => customElements.get('ct-table') !== undefined);
    await expect(page).toHaveScreenshot('table-no-footer.png');
  });
});
