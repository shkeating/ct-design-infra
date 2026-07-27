import { test, expect } from '@playwright/test';

test.describe('ct-iframe Visual Regression', () => {
  const variants = [
    { name: 'default', path: '/components/preview/iframe' },
    { name: 'dark', path: '/components/preview/iframe--dark' },
    { name: 'with-background', path: '/components/preview/iframe--with-background' },
    { name: 'sized', path: '/components/preview/iframe--sized' },
    { name: 'vertical-spacing', path: '/components/preview/iframe--vertical-spacing' },
    { name: 'no-url', path: '/components/preview/iframe--no-url' },
  ];

  for (const { name, path } of variants) {
    test(`matches visual snapshot: ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForFunction(() => customElements.get('ct-iframe') !== undefined);
      await expect(page).toHaveScreenshot(`iframe-${name}.png`);
    });
  }
});
