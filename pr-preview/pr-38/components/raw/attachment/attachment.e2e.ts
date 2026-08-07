import { test, expect } from '@playwright/test';

test.describe('ct-attachment Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/attachment');
    await page.waitForFunction(() => customElements.get('ct-attachment') !== undefined);
    await expect(page).toHaveScreenshot('attachment-default.png');
  });

  test('matches with-background visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/attachment--with-background');
    await page.waitForFunction(() => customElements.get('ct-attachment') !== undefined);
    await expect(page).toHaveScreenshot('attachment-with-background.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/attachment--dark');
    await page.waitForFunction(() => customElements.get('ct-attachment') !== undefined);
    await expect(page).toHaveScreenshot('attachment-dark.png');
  });

  test('matches no-metadata visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/attachment--no-metadata');
    await page.waitForFunction(() => customElements.get('ct-attachment') !== undefined);
    await expect(page).toHaveScreenshot('attachment-no-metadata.png');
  });

  test('renders a download link that opens the file url', async ({ page }) => {
    await page.goto('/components/preview/attachment');
    await page.waitForFunction(() => customElements.get('ct-attachment') !== undefined);

    const link = page.locator('ct-attachment ct-link').first();
    const anchor = link.locator('a');
    await expect(anchor).toHaveAttribute('href', 'https://example.com/document.doc');
  });
});
