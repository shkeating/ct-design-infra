import { html, fixture, expect } from '@open-wc/testing';
import './logo';

const PRIMARY_URL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=';
const SECONDARY_URL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=';

describe('ct-logo', () => {
  it('renders nothing when no logo images are provided', async () => {
    const el = await fixture(html`<ct-logo></ct-logo>`);
    expect(el).to.exist;
    expect(el.shadowRoot!.textContent!.trim()).to.equal('');
  });

  it('renders the primary logo image with alt text', async () => {
    const el = await fixture(
      html`<ct-logo primary-mobile-url=${PRIMARY_URL} primary-mobile-alt="Site logo" primary-desktop-url=${PRIMARY_URL} primary-desktop-alt="Site logo"></ct-logo>`,
    );
    const img = el.shadowRoot!.querySelector('.ct-logo__image--mobile') as HTMLImageElement;
    expect(img).to.exist;
    expect(img.alt).to.equal('Site logo');
  });

  it('wraps the logo in a link when a url is provided', async () => {
    const el = await fixture(
      html`<ct-logo primary-mobile-url=${PRIMARY_URL} url="/" title="Homepage"></ct-logo>`,
    );
    const link = el.shadowRoot!.querySelector('a.ct-logo');
    expect(link).to.exist;
    expect(link!.getAttribute('href')).to.equal('/');
    expect(link!.getAttribute('title')).to.equal('Homepage');
  });

  it('only renders the secondary logo and stripe when type is not "default"', async () => {
    const defaultEl = await fixture(
      html`<ct-logo primary-mobile-url=${PRIMARY_URL} secondary-mobile-url=${SECONDARY_URL}></ct-logo>`,
    );
    expect(defaultEl.shadowRoot!.querySelector('.ct-logo__secondary')).to.not.exist;
    expect(defaultEl.shadowRoot!.querySelector('.ct-logo__stripe')).to.not.exist;

    const stackedEl = await fixture(
      html`<ct-logo type="stacked" primary-mobile-url=${PRIMARY_URL} secondary-mobile-url=${SECONDARY_URL}></ct-logo>`,
    );
    expect(stackedEl.shadowRoot!.querySelector('.ct-logo__secondary')).to.exist;
    expect(stackedEl.shadowRoot!.querySelector('.ct-logo__stripe')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-logo primary-mobile-url=${PRIMARY_URL} primary-mobile-alt="Accessible logo" url="/" title="Homepage"></ct-logo>`,
    );
    await expect(el).to.be.accessible();
  });
});
