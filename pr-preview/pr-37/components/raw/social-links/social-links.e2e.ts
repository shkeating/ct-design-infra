import { test, expect } from '@playwright/test';

test.describe('ct-social-links Visual Regression', () => {
  test('matches default (light, no border) visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/social-links');
    await page.waitForFunction(() => customElements.get('ct-social-links') !== undefined);
    await expect(page).toHaveScreenshot('social-links-default.png');
  });

  test('matches with-border visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/social-links--with-border');
    await page.waitForFunction(() => customElements.get('ct-social-links') !== undefined);
    await expect(page).toHaveScreenshot('social-links-with-border.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/social-links--dark');
    await page.waitForFunction(() => customElements.get('ct-social-links') !== undefined);
    await expect(page).toHaveScreenshot('social-links-dark.png');
  });

  test('matches custom-icon (icon_html) visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/social-links--custom-icon');
    await page.waitForFunction(() => customElements.get('ct-social-links') !== undefined);
    await expect(page).toHaveScreenshot('social-links-custom-icon.png');
  });

  test('matches no-title visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/social-links--no-title');
    await page.waitForFunction(() => customElements.get('ct-social-links') !== undefined);
    await expect(page).toHaveScreenshot('social-links-no-title.png');
  });
});
