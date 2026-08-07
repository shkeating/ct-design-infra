import { html, fixture, expect } from '@open-wc/testing';
import './search';
import '../../01-atoms/link/link';

describe('ct-search', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-search label="Search" url="/search"></ct-search>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.querySelector('.ct-search')).to.exist;
  });

  it('composes the real ct-link element with the magnifier icon trailing', async () => {
    const el = await fixture(html`<ct-search label="Search" url="/search"></ct-search>`);
    const link = el.shadowRoot!.querySelector('ct-link');
    expect(link).to.exist;
    expect(link!.getAttribute('label')).to.equal('Search');
    expect(link!.getAttribute('url')).to.equal('/search');
    expect(link!.getAttribute('icon')).to.equal('magnifier');
    expect(link!.getAttribute('icon-placement')).to.equal('after');
    expect(link!.hasAttribute('icon-group-disabled')).to.be.true;
  });

  it('applies the theme class', async () => {
    const el = await fixture(html`<ct-search theme="dark" label="Search" url="/search"></ct-search>`);
    const wrap = el.shadowRoot!.querySelector('.ct-search');
    expect(wrap!.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('applies an additional modifier class', async () => {
    const el = await fixture(
      html`<ct-search label="Search" url="/search" modifier-class="custom-class"></ct-search>`,
    );
    const wrap = el.shadowRoot!.querySelector('.ct-search');
    expect(wrap!.classList.contains('custom-class')).to.be.true;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html`<ct-search label="Search" url="/search"></ct-search>`);
    await expect(el).to.be.accessible();
  });
});
