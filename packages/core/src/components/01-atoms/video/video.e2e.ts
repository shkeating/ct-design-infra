import { test, expect } from '@playwright/test';

test.describe('ct-video Visual Regression', () => {
  const variants = [
    { name: 'default', path: '/components/preview/video' },
    { name: 'dark', path: '/components/preview/video--dark' },
    { name: 'sized', path: '/components/preview/video--sized' },
    { name: 'no-controls', path: '/components/preview/video--no-controls' },
    { name: 'no-src', path: '/components/preview/video--no-src' },
  ];

  for (const { name, path } of variants) {
    test(`matches visual snapshot: ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForFunction(() => customElements.get('ct-video') !== undefined);
      await expect(page).toHaveScreenshot(`video-${name}.png`);
    });
  }
});
