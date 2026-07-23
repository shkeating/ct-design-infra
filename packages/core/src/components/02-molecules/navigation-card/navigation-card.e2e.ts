import { test, expect } from '@playwright/test';

test.describe('ct-navigation-card Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/navigation-card');
    
    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-navigation-card') !== undefined);
    
    // Take a full page screenshot
    await expect(page).toHaveScreenshot('navigation-card-default.png');
  });
});
