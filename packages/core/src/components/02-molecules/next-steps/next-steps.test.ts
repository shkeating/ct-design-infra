import { html, fixture, expect } from '@open-wc/testing';
import './next-steps.js';

describe('ct-next-steps', () => {
  it('renders the heading and content', async () => {
    const el = await fixture(
      html`<ct-next-steps heading="Update your address" content="Let us know if you've moved."></ct-next-steps>`,
    );
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;

    const heading = el.shadowRoot!.querySelector('ct-heading');
    expect(heading).to.exist;
    expect(heading!.getAttribute('content')).to.equal('Update your address');

    const paragraph = el.shadowRoot!.querySelector('ct-paragraph');
    expect(paragraph).to.exist;
    expect(paragraph!.getAttribute('content')).to.equal("Let us know if you've moved.");
  });

  it('renders nothing when heading is empty', async () => {
    const el = await fixture(html`<ct-next-steps></ct-next-steps>`);
    expect(el.shadowRoot!.textContent!.trim()).to.equal('');
  });

  it('renders a linked title via ct-link when link-url is set', async () => {
    const el = await fixture(
      html`<ct-next-steps heading="Register to vote" link-url="https://example.com" link-external link-new-window></ct-next-steps>`,
    );
    const link = el.shadowRoot!.querySelector('ct-link');
    expect(link).to.exist;
    expect(link!.getAttribute('label')).to.equal('Register to vote');
    expect(link!.getAttribute('url')).to.equal('https://example.com');
    expect(link!.hasAttribute('external')).to.be.true;
    expect(link!.hasAttribute('new-window')).to.be.true;
    // No plain-text ct-heading when the title is a link.
    expect(el.shadowRoot!.querySelector('ct-heading')).to.not.exist;
  });

  it('applies the dark theme class', async () => {
    const el = await fixture(html`<ct-next-steps heading="Dark example" theme="dark"></ct-next-steps>`);
    expect(el.shadowRoot!.querySelector('.ct-theme-dark')).to.exist;
  });

  it('applies the vertical-spacing class when set', async () => {
    const el = await fixture(
      html`<ct-next-steps heading="Spacing example" vertical-spacing="both"></ct-next-steps>`,
    );
    expect(el.shadowRoot!.querySelector('.ct-vertical-spacing-inset--both')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-next-steps heading="Accessible next step" content="Some helpful body copy."></ct-next-steps>`,
    );
    await expect(el).to.be.accessible();
  });
});
