import { test, expect } from '@playwright/test';

test.describe('ct-fieldset Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/fieldset');
    await page.waitForFunction(() => customElements.get('ct-fieldset') !== undefined);
    await expect(page).toHaveScreenshot('fieldset-default.png');
  });

  test('matches with-message visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/fieldset--with-message');
    await page.waitForFunction(() => customElements.get('ct-fieldset') !== undefined);
    await expect(page).toHaveScreenshot('fieldset-with-message.png');
  });

  test('matches description-after visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/fieldset--description-after');
    await page.waitForFunction(() => customElements.get('ct-fieldset') !== undefined);
    await expect(page).toHaveScreenshot('fieldset-description-after.png');
  });

  test('matches description-invisible visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/fieldset--description-invisible');
    await page.waitForFunction(() => customElements.get('ct-fieldset') !== undefined);
    await expect(page).toHaveScreenshot('fieldset-description-invisible.png');
  });

  test('matches no-fields visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/fieldset--no-fields');
    await page.waitForFunction(() => customElements.get('ct-fieldset') !== undefined);
    await expect(page).toHaveScreenshot('fieldset-no-fields.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/fieldset--dark');
    await page.waitForFunction(() => customElements.get('ct-fieldset') !== undefined);
    await expect(page).toHaveScreenshot('fieldset-dark.png');
  });
});
