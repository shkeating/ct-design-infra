import { test, expect } from '@playwright/test';

test.describe('ct-tooltip Visual Regression', () => {
  test('matches visual snapshot (open by default for demo purposes)', async ({ page }) => {
    await page.goto('/components/preview/tooltip');
    await page.waitForFunction(() => customElements.get('ct-tooltip') !== undefined);
    await expect(page).toHaveScreenshot('tooltip-default.png');
  });

  test('matches closed visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tooltip--closed');
    await page.waitForFunction(() => customElements.get('ct-tooltip') !== undefined);
    await expect(page).toHaveScreenshot('tooltip-closed.png');
  });

  test('matches right-position visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tooltip--right');
    await page.waitForFunction(() => customElements.get('ct-tooltip') !== undefined);
    await expect(page).toHaveScreenshot('tooltip-right.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tooltip--dark');
    await page.waitForFunction(() => customElements.get('ct-tooltip') !== undefined);
    await expect(page).toHaveScreenshot('tooltip-dark.png');
  });

  test('opens on trigger focus and closes on dismiss click', async ({ page }) => {
    await page.goto('/components/preview/tooltip--closed');
    await page.waitForFunction(() => customElements.get('ct-tooltip') !== undefined);

    const tooltip = page.locator('ct-tooltip');
    const trigger = tooltip.locator('.ct-tooltip__button');
    const description = tooltip.locator('.ct-tooltip__description');

    await expect(description).toBeHidden();
    await trigger.focus();
    await expect(description).toBeVisible();

    const closeButton = tooltip.locator('.ct-tooltip__description__close ct-button');
    await closeButton.click();
    await expect(description).toBeHidden();
  });
});
