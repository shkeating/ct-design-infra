import { html, fixture, expect } from '@open-wc/testing';
import './image';
import type { CtImage } from './image';

describe('ct-image', () => {
  it('renders an img with the given url and alt text', async () => {
    const el = await fixture<CtImage>(
      html`<ct-image url="/test.jpg" alt="A test image"></ct-image>`,
    );
    const img = el.shadowRoot!.querySelector('img.ct-image') as HTMLImageElement;
    expect(img).to.exist;
    expect(img.getAttribute('src')).to.equal('/test.jpg');
    expect(img.getAttribute('alt')).to.equal('A test image');
  });

  it('applies the theme class', async () => {
    const el = await fixture<CtImage>(
      html`<ct-image url="/test.jpg" alt="Dark" theme="dark"></ct-image>`,
    );
    const img = el.shadowRoot!.querySelector('img') as HTMLImageElement;
    expect(img.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('passes width/height through as native attributes', async () => {
    const el = await fixture<CtImage>(
      html`<ct-image url="/test.jpg" alt="Sized" width="400" height="300"></ct-image>`,
    );
    const img = el.shadowRoot!.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('width')).to.equal('400');
    expect(img.getAttribute('height')).to.equal('300');
  });

  it('renders nothing when url is empty', async () => {
    const el = await fixture<CtImage>(html`<ct-image alt="No URL"></ct-image>`);
    expect(el.shadowRoot!.querySelector('img')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-image url="/test.jpg" alt="Accessible image"></ct-image>`);
    await expect(el).to.be.accessible();
  });
});
