import { test, expect } from '@playwright/test';

test.describe('ct-subject-card Visual Regression', () => {
  const variants = [
    { name: 'default', path: '/components/preview/subject-card' },
    { name: 'dark', path: '/components/preview/subject-card--dark' },
    { name: 'no-image', path: '/components/preview/subject-card--no-image' },
    { name: 'no-link', path: '/components/preview/subject-card--no-link' },
    { name: 'title-click', path: '/components/preview/subject-card--title-click' },
    { name: 'no-heading', path: '/components/preview/subject-card--no-heading' },
  ];

  for (const { name, path } of variants) {
    test(`matches visual snapshot: ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForFunction(() => customElements.get('ct-subject-card') !== undefined);
      await expect(page).toHaveScreenshot(`subject-card-${name}.png`);
    });
  }
});
