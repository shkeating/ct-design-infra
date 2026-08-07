import { test, expect } from '@playwright/test';

test.describe('ct-video-player Visual Regression', () => {
  const variants = [
    { name: 'default', path: '/components/preview/video-player' },
    { name: 'dark', path: '/components/preview/video-player--dark' },
    { name: 'embedded-source', path: '/components/preview/video-player--embedded-source' },
    { name: 'raw-source', path: '/components/preview/video-player--raw-source' },
    { name: 'no-transcript', path: '/components/preview/video-player--no-transcript' },
    { name: 'vertical-spacing-top', path: '/components/preview/video-player--vertical-spacing-top' },
  ];

  for (const { name, path } of variants) {
    test(`matches visual snapshot: ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForFunction(() => customElements.get('ct-video-player') !== undefined);
      await expect(page).toHaveScreenshot(`video-player-${name}.png`);
    });
  }
});

test.describe('ct-video-player composition', () => {
  // Real cross-shadow-DOM checks per this port's brief - a screenshot alone can't prove the
  // composed ct-video/ct-iframe host elements actually fill the aspect-ratio wrapper (see
  // component doc comment's layout note and the ct-checkbox/ct-radio blockification precedent).
  test('the composed ct-video host fills the aspect-ratio wrapper', async ({ page }) => {
    await page.goto('/components/preview/video-player');
    await page.waitForFunction(() => customElements.get('ct-video-player') !== undefined);

    const rects = await page.evaluate(() => {
      const host = document.querySelector('ct-video-player')!;
      const wrapper = host.shadowRoot!.querySelector('.ct-video-player__wrapper')!;
      const video = host.shadowRoot!.querySelector('ct-video')!;
      const w = wrapper.getBoundingClientRect();
      const v = video.getBoundingClientRect();
      return { width: Math.abs(w.width - v.width), height: Math.abs(w.height - v.height), top: v.top - w.top, left: v.left - w.left };
    });

    expect(rects.width).toBeLessThan(1);
    expect(rects.height).toBeLessThan(1);
    expect(rects.top).toBeCloseTo(0, 0);
    expect(rects.left).toBeCloseTo(0, 0);
  });

  test('the composed ct-iframe host fills the aspect-ratio wrapper', async ({ page }) => {
    await page.goto('/components/preview/video-player--embedded-source');
    await page.waitForFunction(() => customElements.get('ct-video-player') !== undefined);

    const rects = await page.evaluate(() => {
      const host = document.querySelector('ct-video-player')!;
      const wrapper = host.shadowRoot!.querySelector('.ct-video-player__wrapper')!;
      const iframe = host.shadowRoot!.querySelector('ct-iframe')!;
      const w = wrapper.getBoundingClientRect();
      const i = iframe.getBoundingClientRect();
      return { width: Math.abs(w.width - i.width), height: Math.abs(w.height - i.height) };
    });

    expect(rects.width).toBeLessThan(1);
    expect(rects.height).toBeLessThan(1);
  });

  test('the transcript toggle expands the panel and updates aria-expanded on a real click', async ({ page }) => {
    await page.goto('/components/preview/video-player');
    await page.waitForFunction(() => customElements.get('ct-video-player') !== undefined);

    const toggle = page.locator('ct-video-player').locator('ct-button.ct-video-player__transcript-toggle');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Playwright's locator click pierces shadow roots and dispatches a real pointer event on
    // the actual inner <button> - not a synthetic host-level event.
    await toggle.click();

    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const panel = page.locator('ct-video-player').locator('.ct-video-player__transcript-panel');
    await expect(panel).not.toHaveAttribute('hidden', '');
  });
});
