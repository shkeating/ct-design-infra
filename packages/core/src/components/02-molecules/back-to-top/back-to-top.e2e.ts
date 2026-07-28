import { test, expect } from '@playwright/test';

test.describe('ct-back-to-top Visual Regression', () => {
  test('matches visual snapshot (visible by default for demo purposes)', async ({ page }) => {
    await page.goto('/components/preview/back-to-top');
    await page.waitForFunction(() => customElements.get('ct-back-to-top') !== undefined);
    await expect(page).toHaveScreenshot('back-to-top-default.png');
  });

  test('matches hidden visual snapshot (below the scroll threshold)', async ({ page }) => {
    await page.goto('/components/preview/back-to-top--hidden');
    await page.waitForFunction(() => customElements.get('ct-back-to-top') !== undefined);
    await expect(page).toHaveScreenshot('back-to-top-hidden.png');
  });

  test('matches custom-target visual snapshot', async ({ page }) => {
    await page.goto('/components/preview/back-to-top--custom-target');
    await page.waitForFunction(() => customElements.get('ct-back-to-top') !== undefined);
    await expect(page).toHaveScreenshot('back-to-top-custom-target.png');
  });
});

test.describe('ct-back-to-top behavior', () => {
  test('becomes visible only once window.scrollY passes scrollOffset', async ({ page }) => {
    await page.goto('/components/preview/back-to-top--hidden');
    await page.waitForFunction(() => customElements.get('ct-back-to-top') !== undefined);

    // Make the page tall enough to actually scroll, then lower the
    // threshold to something reachable within it.
    await page.evaluate(() => {
      document.body.style.minHeight = '3000px';
      const el = document.querySelector('ct-back-to-top') as (Element & { scrollOffset?: number }) | null;
      if (el) el.scrollOffset = 200;
    });

    const wrapper = page.locator('ct-back-to-top').locator('.ct-back-to-top');
    await expect(wrapper).not.toHaveClass(/ct-scrollspy-scrolled/);

    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(wrapper).toHaveClass(/ct-scrollspy-scrolled/);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(wrapper).not.toHaveClass(/ct-scrollspy-scrolled/);
  });

  test('click scrolls to and focuses the target element', async ({ page }) => {
    await page.goto('/components/preview/back-to-top');
    await page.waitForFunction(() => customElements.get('ct-back-to-top') !== undefined);

    // The Fractal preview shell has no real page chrome, so give the
    // component's default `target="#top"` something concrete to find —
    // a real page composing this component supplies its own top anchor.
    await page.evaluate(() => {
      document.body.style.minHeight = '3000px';
      const topEl = document.createElement('div');
      topEl.id = 'top';
      document.body.prepend(topEl);
      window.scrollTo(0, 500);
    });

    const button = page.locator('ct-back-to-top').locator('ct-button');
    await button.click();

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(500);

    const focused = await page.evaluate(() => document.activeElement?.id);
    expect(focused).toBe('top');

    const targetTabindex = await page.evaluate(() => document.getElementById('top')?.getAttribute('tabindex'));
    expect(targetTabindex).toBe('-1');
  });
});
