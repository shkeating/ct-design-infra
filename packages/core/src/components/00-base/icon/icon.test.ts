import { html, fixture, expect } from '@open-wc/testing';
import './icon.js';

describe('ct-icon', () => {
  it('renders the matching SVG for a known icon name', async () => {
    const el = await fixture(html`<ct-icon name="account"></ct-icon>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    const svg = el.shadowRoot!.querySelector('svg.ct-icon');
    expect(svg).to.exist;
    expect(svg!.getAttribute('aria-hidden')).to.equal('true');
    expect(svg!.getAttribute('role')).to.equal('img');
  });

  it('renders nothing for an unknown icon name', async () => {
    const el = await fixture(html`<ct-icon name="does-not-exist"></ct-icon>`);
    expect(el.shadowRoot!.querySelector('svg')).to.not.exist;
  });

  it('applies a size modifier class', async () => {
    const el = await fixture(html`<ct-icon name="account" size="large"></ct-icon>`);
    const svg = el.shadowRoot!.querySelector('svg.ct-icon--size-large');
    expect(svg).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-icon name="account"></ct-icon>`);
    await expect(el).to.be.accessible();
  });
});
