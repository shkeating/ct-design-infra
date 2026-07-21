import { test, expect } from '@playwright/test';

test.describe('ct-paragraph Visual Regression', () => {
  test('default', async ({ page }) => {
    await page.goto('/components/preview/paragraph');
    await page.waitForFunction(() => customElements.get('ct-paragraph') !== undefined);
    await expect(page).toHaveScreenshot('paragraph-default.png');
  });

  test('dark', async ({ page }) => {
    await page.goto('/components/preview/paragraph--dark');
    await page.waitForFunction(() => customElements.get('ct-paragraph') !== undefined);
    await expect(page).toHaveScreenshot('paragraph-dark.png');
  });

  test('extra-large', async ({ page }) => {
    await page.goto('/components/preview/paragraph--extra-large');
    await page.waitForFunction(() => customElements.get('ct-paragraph') !== undefined);
    await expect(page).toHaveScreenshot('paragraph-extra-large.png');
  });

  test('large', async ({ page }) => {
    await page.goto('/components/preview/paragraph--large');
    await page.waitForFunction(() => customElements.get('ct-paragraph') !== undefined);
    await expect(page).toHaveScreenshot('paragraph-large.png');
  });

  test('small', async ({ page }) => {
    await page.goto('/components/preview/paragraph--small');
    await page.waitForFunction(() => customElements.get('ct-paragraph') !== undefined);
    await expect(page).toHaveScreenshot('paragraph-small.png');
  });

  test('no-margin', async ({ page }) => {
    await page.goto('/components/preview/paragraph--no-margin');
    await page.waitForFunction(() => customElements.get('ct-paragraph') !== undefined);
    await expect(page).toHaveScreenshot('paragraph-no-margin.png');
  });

  test('rich-content', async ({ page }) => {
    await page.goto('/components/preview/paragraph--rich-content');
    await page.waitForFunction(() => customElements.get('ct-paragraph') !== undefined);
    await expect(page).toHaveScreenshot('paragraph-rich-content.png');
  });
});
