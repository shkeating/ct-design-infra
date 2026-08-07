import { test, expect } from '@playwright/test';

test.describe('ct-field Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-default.png');
  });

  test('matches textarea visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--textarea');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-textarea.png');
  });

  test('matches select visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--select');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-select.png');
  });

  test('matches checkbox group visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--checkbox');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-checkbox.png');
  });

  test('matches radio group visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--radio');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-radio.png');
  });

  test('matches horizontal orientation visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--horizontal');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-horizontal.png');
  });

  test('matches invalid visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--invalid');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-invalid.png');
  });

  test('matches disabled visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--disabled');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-disabled.png');
  });

  test('matches dark theme visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/field--dark');
    await page.waitForFunction(() => customElements.get('ct-field') !== undefined);
    await expect(page).toHaveScreenshot('field-dark.png');
  });
});
