import { html, fixture, expect } from '@open-wc/testing';
import './tag.js';
import type { CtTag } from './tag.js';

describe('ct-tag', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-tag label="Test Label"></ct-tag>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Label');
  });

  it('renders as a span by default', async () => {
    const el = await fixture<CtTag>(html`<ct-tag label="Test Label"></ct-tag>`);
    expect(el.shadowRoot!.querySelector('span.ct-tag')).to.exist;
    expect(el.shadowRoot!.querySelector('a.ct-tag')).to.not.exist;
  });

  it('renders as a link when a url is provided', async () => {
    const el = await fixture<CtTag>(html`<ct-tag label="Test Label" url="/test"></ct-tag>`);
    const anchor = el.shadowRoot!.querySelector('a.ct-tag');
    expect(anchor).to.exist;
    expect(anchor!.getAttribute('href')).to.equal('/test');
  });

  it('applies the theme and variant classes', async () => {
    const el = await fixture<CtTag>(
      html`<ct-tag label="Test Label" theme="dark" variant="secondary"></ct-tag>`,
    );
    const tag = el.shadowRoot!.querySelector('.ct-tag')!;
    expect(tag.classList.contains('ct-theme-dark')).to.be.true;
    expect(tag.classList.contains('ct-tag--secondary')).to.be.true;
  });

  it('renders nothing when label is empty', async () => {
    const el = await fixture<CtTag>(html`<ct-tag></ct-tag>`);
    expect(el.shadowRoot!.querySelector('.ct-tag')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-tag label="Accessible Label"></ct-tag>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audits as a link', async () => {
    const el = await fixture(html`<ct-tag label="Accessible Link" url="/test"></ct-tag>`);
    await expect(el).to.be.accessible();
  });
});
