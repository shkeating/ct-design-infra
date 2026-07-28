import { test, expect } from '@playwright/test';

test.describe('ct-tabs Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tabs');
    await page.waitForFunction(() => customElements.get('ct-tabs') !== undefined);
    await expect(page).toHaveScreenshot('tabs-default.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tabs--dark');
    await page.waitForFunction(() => customElements.get('ct-tabs') !== undefined);
    await expect(page).toHaveScreenshot('tabs-dark.png');
  });

  test('matches vertical-spacing visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/tabs--vertical-spacing');
    await page.waitForFunction(() => customElements.get('ct-tabs') !== undefined);
    await expect(page).toHaveScreenshot('tabs-vertical-spacing.png');
  });

  test('switches the selected tab and panel on trigger click', async ({ page }) => {
    await page.goto('/components/preview/tabs');
    await page.waitForFunction(() => customElements.get('ct-tabs') !== undefined);

    const secondTrigger = page.locator('ct-tabs').locator('[role="tab"]').nth(1);
    await expect(secondTrigger).toHaveAttribute('aria-selected', 'false');
    await secondTrigger.click();
    await expect(secondTrigger).toHaveAttribute('aria-selected', 'true');
  });

  test('arrow-key navigation moves focus between tabs and skips a disabled tab', async ({ page }) => {
    await page.goto('/components/preview/tabs');
    await page.waitForFunction(() => customElements.get('ct-tabs') !== undefined);

    const secondTrigger = page.locator('ct-tabs').locator('[role="tab"]').nth(1);
    await secondTrigger.click();
    await secondTrigger.press('ArrowRight');
    // focusNextTab's DOM focus() call runs inside Zag's raf() wrapper (next animation frame),
    // not synchronously with the keydown — give it a tick before reading document.activeElement.
    await page.waitForTimeout(100);

    const focused = await page.evaluate(() => {
      const tabs = document.querySelector('ct-tabs');
      const active = tabs?.shadowRoot?.activeElement as HTMLElement | null;
      return active?.textContent?.trim() ?? null;
    });
    // The third tab is disabled, so ArrowRight from the second tab loops back to the first.
    expect(focused).toBe('What is CivicTheme?');
  });
});
