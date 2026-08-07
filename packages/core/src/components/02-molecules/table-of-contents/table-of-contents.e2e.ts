import { test, expect } from '@playwright/test';

test.describe('ct-table-of-contents Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table-of-contents');
    await page.waitForFunction(() => customElements.get('ct-table-of-contents') !== undefined);
    await expect(page).toHaveScreenshot('table-of-contents-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table-of-contents--dark');
    await page.waitForFunction(() => customElements.get('ct-table-of-contents') !== undefined);
    await expect(page).toHaveScreenshot('table-of-contents-dark.png');
  });

  test('matches position-after visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table-of-contents--position-after');
    await page.waitForFunction(() => customElements.get('ct-table-of-contents') !== undefined);
    await expect(page).toHaveScreenshot('table-of-contents-position-after.png');
  });

  test('matches no-heading visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/table-of-contents--no-heading');
    await page.waitForFunction(() => customElements.get('ct-table-of-contents') !== undefined);
    await expect(page).toHaveScreenshot('table-of-contents-no-heading.png');
  });
});
