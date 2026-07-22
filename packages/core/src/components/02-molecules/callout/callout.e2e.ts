import { test, expect } from '@playwright/test';

test.describe('ct-callout Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/callout');

    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-callout') !== undefined);

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('callout-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/callout--dark');
    await page.waitForFunction(() => customElements.get('ct-callout') !== undefined);
    await expect(page).toHaveScreenshot('callout-dark.png');
  });

  test('matches vertical-spacing-both visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/callout--vertical-spacing-both');
    await page.waitForFunction(() => customElements.get('ct-callout') !== undefined);
    await expect(page).toHaveScreenshot('callout-vertical-spacing-both.png');
  });

  test('matches single-link visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/callout--single-link');
    await page.waitForFunction(() => customElements.get('ct-callout') !== undefined);
    await expect(page).toHaveScreenshot('callout-single-link.png');
  });

  test('matches with-content-slots visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/callout--with-content-slots');
    await page.waitForFunction(() => customElements.get('ct-callout') !== undefined);
    await expect(page).toHaveScreenshot('callout-with-content-slots.png');
  });
});
