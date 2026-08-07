import { test, expect } from '@playwright/test';

test.describe('ct-logo Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/logo');
    await page.waitForFunction(() => customElements.get('ct-logo') !== undefined);
    await expect(page).toHaveScreenshot('logo-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/logo--dark');
    await page.waitForFunction(() => customElements.get('ct-logo') !== undefined);
    await expect(page).toHaveScreenshot('logo-dark.png');
  });

  test('matches stacked visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/logo--stacked');
    await page.waitForFunction(() => customElements.get('ct-logo') !== undefined);
    await expect(page).toHaveScreenshot('logo-stacked.png');
  });

  test('matches inline visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/logo--inline');
    await page.waitForFunction(() => customElements.get('ct-logo') !== undefined);
    await expect(page).toHaveScreenshot('logo-inline.png');
  });

  test('matches inline-stacked visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/logo--inline-stacked');
    await page.waitForFunction(() => customElements.get('ct-logo') !== undefined);
    await expect(page).toHaveScreenshot('logo-inline-stacked.png');
  });

  test('matches no-link visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/logo--no-link');
    await page.waitForFunction(() => customElements.get('ct-logo') !== undefined);
    await expect(page).toHaveScreenshot('logo-no-link.png');
  });
});
