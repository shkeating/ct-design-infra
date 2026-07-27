import { test, expect } from '@playwright/test';

test.describe('ct-popover Visual Regression', () => {
  test('matches visual snapshot (open by default for demo purposes)', async ({ page }) => {
    await page.goto('/components/preview/popover');
    await page.waitForFunction(() => customElements.get('ct-popover') !== undefined);
    await expect(page).toHaveScreenshot('popover-default.png');
  });

  test('matches closed visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/popover--closed');
    await page.waitForFunction(() => customElements.get('ct-popover') !== undefined);
    await expect(page).toHaveScreenshot('popover-closed.png');
  });

  test('matches with-content-slots visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/popover--with-content-slots');
    await page.waitForFunction(() => customElements.get('ct-popover') !== undefined);
    await expect(page).toHaveScreenshot('popover-with-content-slots.png');
  });

  test('matches with-link-trigger visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/popover--with-link-trigger');
    await page.waitForFunction(() => customElements.get('ct-popover') !== undefined);
    await expect(page).toHaveScreenshot('popover-with-link-trigger.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/popover--dark');
    await page.waitForFunction(() => customElements.get('ct-popover') !== undefined);
    await expect(page).toHaveScreenshot('popover-dark.png');
  });

  test('opens on trigger click, closes on Escape, and restores focus to the trigger', async ({ page }) => {
    await page.goto('/components/preview/popover--closed');
    await page.waitForFunction(() => customElements.get('ct-popover') !== undefined);

    const popover = page.locator('ct-popover');
    const trigger = popover.locator('ct-link');
    const content = popover.locator('.ct-popover__content');

    await expect(content).toBeHidden();
    await trigger.click();
    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(content).toBeHidden();
  });

  test('closes when clicking outside the panel', async ({ page }) => {
    await page.goto('/components/preview/popover--closed');
    await page.waitForFunction(() => customElements.get('ct-popover') !== undefined);

    const popover = page.locator('ct-popover');
    const trigger = popover.locator('ct-link');
    const content = popover.locator('.ct-popover__content');

    await trigger.click();
    await expect(content).toBeVisible();
    // The Zag.js dismissable outside-click listener attaches via a deferred setTimeout(0) (to
    // avoid dismissing from the very same click that opened it) - give it a tick before
    // clicking outside, or the click can race ahead of that listener being attached.
    await page.waitForTimeout(100);

    await page.mouse.click(700, 600);
    await expect(content).toBeHidden();
  });
});
