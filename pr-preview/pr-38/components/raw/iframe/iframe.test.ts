import { html, fixture, expect } from '@open-wc/testing';
import './iframe';
import type { CtIframe } from './iframe';

describe('ct-iframe', () => {
  it('renders an iframe with the given url', async () => {
    const el = await fixture<CtIframe>(
      html`<ct-iframe url="https://example.com/embed" title="Example embed"></ct-iframe>`,
    );
    const iframe = el.shadowRoot!.querySelector('iframe.ct-iframe') as HTMLIFrameElement;
    expect(iframe).to.exist;
    expect(iframe.getAttribute('src')).to.equal('https://example.com/embed');
  });

  it('applies the theme class', async () => {
    const el = await fixture<CtIframe>(
      html`<ct-iframe url="https://example.com/embed" theme="dark"></ct-iframe>`,
    );
    const iframe = el.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('passes width/height through as native attributes', async () => {
    const el = await fixture<CtIframe>(
      html`<ct-iframe url="https://example.com/embed" width="640" height="360"></ct-iframe>`,
    );
    const iframe = el.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.getAttribute('width')).to.equal('640');
    expect(iframe.getAttribute('height')).to.equal('360');
  });

  it('reflects title onto the native attribute', async () => {
    const el = await fixture<CtIframe>(
      html`<ct-iframe url="https://example.com/embed" title="Accessible frame name"></ct-iframe>`,
    );
    const iframe = el.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.getAttribute('title')).to.equal('Accessible frame name');
  });

  it('applies the with-background class and modifier', async () => {
    const el = await fixture<CtIframe>(
      html`<ct-iframe url="https://example.com/embed" with-background></ct-iframe>`,
    );
    const iframe = el.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.classList.contains('ct-iframe--with-background')).to.be.true;
  });

  it('applies the vertical-spacing utility class only for top/bottom/both', async () => {
    const el = await fixture<CtIframe>(
      html`<ct-iframe url="https://example.com/embed" vertical-spacing="both"></ct-iframe>`,
    );
    const iframe = el.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.classList.contains('ct-vertical-spacing-inset--both')).to.be.true;
  });

  it('applies no vertical-spacing class for "none"', async () => {
    const el = await fixture<CtIframe>(
      html`<ct-iframe url="https://example.com/embed" vertical-spacing="none"></ct-iframe>`,
    );
    const iframe = el.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.className).to.not.include('ct-vertical-spacing-inset');
  });

  it('renders nothing when url is empty', async () => {
    const el = await fixture<CtIframe>(html`<ct-iframe></ct-iframe>`);
    expect(el.shadowRoot!.querySelector('iframe')).to.not.exist;
  });

  it('passes accessibility audits when a title is provided', async () => {
    const el = await fixture(
      html`<ct-iframe url="https://example.com/embed" title="Accessible embed"></ct-iframe>`,
    );
    await expect(el).to.be.accessible();
  });
});
