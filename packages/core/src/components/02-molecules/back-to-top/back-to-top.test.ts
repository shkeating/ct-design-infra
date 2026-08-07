import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import './back-to-top';
import type { CtBackToTop } from './back-to-top';

describe('ct-back-to-top', () => {
  it('renders composed ct-button and ct-icon', async () => {
    const el = await fixture<CtBackToTop>(html`<ct-back-to-top></ct-back-to-top>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;

    const button = el.shadowRoot!.querySelector('ct-button');
    expect(button).to.exist;
    expect(button!.getAttribute('icon')).to.equal('up-arrow');
    expect(button!.getAttribute('kind')).to.equal('link');
  });

  it('is hidden by default and visible once scrolled past scrollOffset', async () => {
    const el = await fixture<CtBackToTop>(html`<ct-back-to-top scroll-offset="0"></ct-back-to-top>`);
    const wrapper = () => el.shadowRoot!.querySelector('.ct-back-to-top')!;

    expect(wrapper().classList.contains('ct-scrollspy-scrolled')).to.be.false;

    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true });
    document.dispatchEvent(new Event('scroll'));
    await aTimeout(0);
    await el.updateComplete;

    expect(wrapper().classList.contains('ct-scrollspy-scrolled')).to.be.true;

    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('uses the label prop as the composed button aria-label', async () => {
    const el = await fixture<CtBackToTop>(
      html`<ct-back-to-top label="Custom accessible name"></ct-back-to-top>`,
    );
    const button = el.shadowRoot!.querySelector('ct-button');
    expect(button!.getAttribute('aria-label')).to.equal('Custom accessible name');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-back-to-top scroll-offset="-1"></ct-back-to-top>`);
    await expect(el).to.be.accessible();
  });
});
