import { html, fixture, expect } from '@open-wc/testing';
import './service-card';
import '../../00-base/item-list/item-list';
import '../../01-atoms/link/link';

describe('ct-service-card', () => {
  it('renders the title via ct-heading', async () => {
    const el = await fixture(html`<ct-service-card title="Services category"></ct-service-card>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    const heading = el.shadowRoot!.querySelector('ct-heading');
    expect(heading).to.exist;
    expect(heading!.getAttribute('content')).to.equal('Services category');
    expect(heading!.getAttribute('level')).to.equal('4');
  });

  it('renders nothing without a title, mirroring upstream `{% if title %}`', async () => {
    const el = await fixture(html`<ct-service-card></ct-service-card>`);
    expect(el.shadowRoot!.querySelector('.ct-service-card')).to.not.exist;
  });

  it('applies the theme class', async () => {
    const el = await fixture(html`<ct-service-card title="Dark card" theme="dark"></ct-service-card>`);
    const card = el.shadowRoot!.querySelector('.ct-service-card');
    expect(card).to.exist;
    expect(card!.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('only renders the links wrapper when a links slot is composed', async () => {
    const withoutLinks = await fixture(html`<ct-service-card title="No links"></ct-service-card>`);
    expect(withoutLinks.shadowRoot!.querySelector('.ct-service-card__links')).to.not.exist;

    const withLinks = await fixture(html`
      <ct-service-card title="With links">
        <ct-item-list slot="links" direction="vertical">
          <ct-item-list-item><ct-link label="Link text" url="https://example.com"></ct-link></ct-item-list-item>
        </ct-item-list>
      </ct-service-card>
    `);
    expect(withLinks.shadowRoot!.querySelector('.ct-service-card__links')).to.exist;
    expect(withLinks.querySelector('ct-item-list')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`
      <ct-service-card title="Accessible service card">
        <ct-item-list slot="links" direction="vertical">
          <ct-item-list-item><ct-link label="Link text" url="https://example.com"></ct-link></ct-item-list-item>
        </ct-item-list>
      </ct-service-card>
    `);
    await expect(el).to.be.accessible();
  });
});
