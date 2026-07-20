import { test, expect } from '@playwright/test';

test.describe('ct-accordion Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/accordion');

    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-accordion') !== undefined);

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('accordion-default.png');
  });

  test('matches expand-all visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/accordion--expand-all');
    await page.waitForFunction(() => customElements.get('ct-accordion') !== undefined);
    await expect(page).toHaveScreenshot('accordion-expand-all.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/accordion--dark');
    await page.waitForFunction(() => customElements.get('ct-accordion') !== undefined);
    await expect(page).toHaveScreenshot('accordion-dark.png');
  });

  test('expands a panel on trigger click', async ({ page }) => {
    await page.goto('/components/preview/accordion');
    await page.waitForFunction(() => customElements.get('ct-accordion') !== undefined);

    const trigger = page.locator('ct-accordion').locator('button').nth(1);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
