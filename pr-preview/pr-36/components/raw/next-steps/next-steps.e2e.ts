import { test, expect } from '@playwright/test';

test.describe('ct-next-steps Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/next-steps');
    await page.waitForFunction(() => customElements.get('ct-next-steps') !== undefined);
    await expect(page).toHaveScreenshot('next-steps-default.png');
  });

  test('matches with-link visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/next-steps--with-link');
    await page.waitForFunction(() => customElements.get('ct-next-steps') !== undefined);
    await expect(page).toHaveScreenshot('next-steps-with-link.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/next-steps--dark');
    await page.waitForFunction(() => customElements.get('ct-next-steps') !== undefined);
    await expect(page).toHaveScreenshot('next-steps-dark.png');
  });

  test('matches vertical-spacing-both visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/next-steps--vertical-spacing-both');
    await page.waitForFunction(() => customElements.get('ct-next-steps') !== undefined);
    await expect(page).toHaveScreenshot('next-steps-vertical-spacing-both.png');
  });
});
