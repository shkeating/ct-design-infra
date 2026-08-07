import { test, expect } from '@playwright/test';

test.describe('ct-chip Visual Regression', () => {
  const variants = [
    { name: 'default', path: '/components/preview/chip' },
    { name: 'large', path: '/components/preview/chip--large' },
    { name: 'small', path: '/components/preview/chip--small' },
    { name: 'selected', path: '/components/preview/chip--selected' },
    { name: 'dark', path: '/components/preview/chip--dark' },
    { name: 'dark-selected', path: '/components/preview/chip--dark-selected' },
    { name: 'input', path: '/components/preview/chip--input' },
    { name: 'input-selected', path: '/components/preview/chip--input-selected' },
    { name: 'link', path: '/components/preview/chip--link' },
    { name: 'disabled', path: '/components/preview/chip--disabled' },
  ];

  for (const { name, path } of variants) {
    test(`matches visual snapshot: ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForFunction(() => customElements.get('ct-chip') !== undefined);
      await expect(page).toHaveScreenshot(`chip-${name}.png`);
    });
  }
});
