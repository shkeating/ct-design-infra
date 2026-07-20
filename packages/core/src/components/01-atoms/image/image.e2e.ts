import { test, expect } from '@playwright/test';

test.describe('ct-image Visual Regression', () => {
  const variants = [
    { name: 'default', path: '/components/preview/image' },
    { name: 'dark', path: '/components/preview/image--dark' },
    { name: 'sized', path: '/components/preview/image--sized' },
    { name: 'no-url', path: '/components/preview/image--no-url' },
  ];

  for (const { name, path } of variants) {
    test(`matches visual snapshot: ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForFunction(() => customElements.get('ct-image') !== undefined);
      await expect(page).toHaveScreenshot(`image-${name}.png`);
    });
  }
});
