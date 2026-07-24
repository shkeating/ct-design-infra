import { html, fixture, expect } from '@open-wc/testing';
import './field-description.js';

describe('ct-field-description', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-field-description content="Test description"></ct-field-description>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test description');
  });

  it('renders nothing when content is empty', async () => {
    const el = await fixture(html`<ct-field-description></ct-field-description>`);
    expect(el.shadowRoot!.querySelector('.ct-field-description')).to.not.exist;
  });

  it('defaults to light theme and regular size', async () => {
    const el = await fixture(html`<ct-field-description content="Hint text"></ct-field-description>`);
    const div = el.shadowRoot!.querySelector('.ct-field-description')!;
    expect(div.classList.contains('ct-theme-light')).to.be.true;
    expect(div.classList.contains('ct-field-description--regular')).to.be.true;
  });

  it('applies the large size class', async () => {
    const el = await fixture(html`<ct-field-description content="Hint text" size="large"></ct-field-description>`);
    const div = el.shadowRoot!.querySelector('.ct-field-description')!;
    expect(div.classList.contains('ct-field-description--large')).to.be.true;
  });

  it('applies the dark theme class', async () => {
    const el = await fixture(html`<ct-field-description content="Hint text" theme="dark"></ct-field-description>`);
    const div = el.shadowRoot!.querySelector('.ct-field-description')!;
    expect(div.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('applies an additional modifier class', async () => {
    const el = await fixture(
      html`<ct-field-description content="Hint text" modifier-class="custom-class"></ct-field-description>`,
    );
    const div = el.shadowRoot!.querySelector('.ct-field-description')!;
    expect(div.classList.contains('custom-class')).to.be.true;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-field-description content="Accessible description"></ct-field-description>`);
    await expect(el).to.be.accessible();
  });
});
