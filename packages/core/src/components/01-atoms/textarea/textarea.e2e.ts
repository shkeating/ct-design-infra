import { test, expect } from '@playwright/test';

test.describe('ct-textarea Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/textarea');
    
    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-textarea') !== undefined);
    
    // Take a full page screenshot
    await expect(page).toHaveScreenshot('textarea-default.png');
  });
});
