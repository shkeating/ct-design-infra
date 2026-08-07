import { test, expect } from '@playwright/test';

test.describe('ct-service-card Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/service-card');
    await page.waitForFunction(() => customElements.get('ct-service-card') !== undefined);
    await expect(page).toHaveScreenshot('service-card-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/service-card--dark');
    await page.waitForFunction(() => customElements.get('ct-service-card') !== undefined);
    await expect(page).toHaveScreenshot('service-card-dark.png');
  });

  test('matches with-content visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/service-card--with-content');
    await page.waitForFunction(() => customElements.get('ct-service-card') !== undefined);
    await expect(page).toHaveScreenshot('service-card-with-content.png');
  });

  test('matches no-links visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/service-card--no-links');
    await page.waitForFunction(() => customElements.get('ct-service-card') !== undefined);
    await expect(page).toHaveScreenshot('service-card-no-links.png');
  });

  test('matches external-link visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/service-card--external-link');
    await page.waitForFunction(() => customElements.get('ct-service-card') !== undefined);
    await expect(page).toHaveScreenshot('service-card-external-link.png');
  });
});
