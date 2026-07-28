import { test, expect } from '@playwright/test';

test.describe('ct-tag-list Visual Regression', () => {
  test('matches default (light) visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tag-list');
    await page.waitForFunction(() => customElements.get('ct-tag-list') !== undefined);
    await expect(page).toHaveScreenshot('tag-list-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tag-list--dark');
    await page.waitForFunction(() => customElements.get('ct-tag-list') !== undefined);
    await expect(page).toHaveScreenshot('tag-list-dark.png');
  });

  test('matches with-icons visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tag-list--with-icons');
    await page.waitForFunction(() => customElements.get('ct-tag-list') !== undefined);
    await expect(page).toHaveScreenshot('tag-list-with-icons.png');
  });

  test('matches mixed-theme-tags visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tag-list--mixed-theme-tags');
    await page.waitForFunction(() => customElements.get('ct-tag-list') !== undefined);
    await expect(page).toHaveScreenshot('tag-list-mixed-theme-tags.png');
  });

  test('matches vertical-spacing visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tag-list--vertical-spacing');
    await page.waitForFunction(() => customElements.get('ct-tag-list') !== undefined);
    await expect(page).toHaveScreenshot('tag-list-vertical-spacing.png');
  });

  test('matches with-content-slots visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tag-list--with-content-slots');
    await page.waitForFunction(() => customElements.get('ct-tag-list') !== undefined);
    await expect(page).toHaveScreenshot('tag-list-with-content-slots.png');
  });
});
