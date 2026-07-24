import { test, expect } from '@playwright/test';

test.describe('ct-breadcrumb Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/breadcrumb');
    await page.waitForFunction(() => customElements.get('ct-breadcrumb') !== undefined);
    await expect(page).toHaveScreenshot('breadcrumb-default.png');
  });

  test('matches active-is-link visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/breadcrumb--active-is-link');
    await page.waitForFunction(() => customElements.get('ct-breadcrumb') !== undefined);
    await expect(page).toHaveScreenshot('breadcrumb-active-is-link.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/breadcrumb--dark');
    await page.waitForFunction(() => customElements.get('ct-breadcrumb') !== undefined);
    await expect(page).toHaveScreenshot('breadcrumb-dark.png');
  });

  test('matches single-link visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/breadcrumb--single-link');
    await page.waitForFunction(() => customElements.get('ct-breadcrumb') !== undefined);
    await expect(page).toHaveScreenshot('breadcrumb-single-link.png');
  });

  test('shows a compact "back" link and hides the full trail on narrow viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 200 });
    await page.goto('/components/preview/breadcrumb');
    await page.waitForFunction(() => customElements.get('ct-breadcrumb') !== undefined);

    const breadcrumb = page.locator('ct-breadcrumb');
    await expect(breadcrumb.locator('.ct-breadcrumb__links--mobile')).toBeVisible();
    await expect(breadcrumb.locator('.ct-breadcrumb__links--full')).toBeHidden();
  });
});
