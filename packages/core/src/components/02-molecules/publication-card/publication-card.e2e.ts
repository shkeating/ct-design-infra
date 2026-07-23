import { test, expect } from '@playwright/test';

test.describe('ct-publication-card Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/publication-card');
    await page.waitForFunction(() => customElements.get('ct-publication-card') !== undefined);
    await expect(page).toHaveScreenshot('publication-card-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/publication-card--dark');
    await page.waitForFunction(() => customElements.get('ct-publication-card') !== undefined);
    await expect(page).toHaveScreenshot('publication-card-dark.png');
  });

  test('matches no-image visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/publication-card--no-image');
    await page.waitForFunction(() => customElements.get('ct-publication-card') !== undefined);
    await expect(page).toHaveScreenshot('publication-card-no-image.png');
  });

  test('matches title-click visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/publication-card--title-click');
    await page.waitForFunction(() => customElements.get('ct-publication-card') !== undefined);
    await expect(page).toHaveScreenshot('publication-card-title-click.png');
  });

  test('matches no-title visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/publication-card--no-title');
    await page.waitForFunction(() => customElements.get('ct-publication-card') !== undefined);
    await expect(page).toHaveScreenshot('publication-card-no-title.png');
  });

  test('matches with-content-slots visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/publication-card--with-content-slots');
    await page.waitForFunction(() => customElements.get('ct-publication-card') !== undefined);
    await expect(page).toHaveScreenshot('publication-card-with-content-slots.png');
  });
});
