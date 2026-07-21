import { html, fixture, expect } from '@open-wc/testing';
import type { CtCallout } from './callout.js';
import './callout.js';
import './callout-link.js';

const markup = html`
  <ct-callout heading="Public consultation now open" content="<p>Share your feedback.</p>">
    <ct-callout-link text="Have your say" url="#"></ct-callout-link>
    <ct-callout-link text="Learn more" url="#" external new-window></ct-callout-link>
  </ct-callout>
`;

describe('ct-callout', () => {
  it('renders the heading via ct-heading', async () => {
    const el = (await fixture(markup)) as CtCallout;
    const heading = el.shadowRoot!.querySelector('ct-heading');
    expect(heading).to.exist;
    expect(heading!.getAttribute('content')).to.equal('Public consultation now open');
    expect(heading!.getAttribute('level')).to.equal('4');
  });

  it('renders the content via ct-paragraph', async () => {
    const el = (await fixture(markup)) as CtCallout;
    const paragraph = el.shadowRoot!.querySelector('ct-paragraph');
    expect(paragraph).to.exist;
    expect(paragraph!.getAttribute('content')).to.equal('<p>Share your feedback.</p>');
  });

  it('renders one ct-button per ct-callout-link child, first as primary and the rest secondary', async () => {
    const el = (await fixture(markup)) as CtCallout;
    const buttons = el.shadowRoot!.querySelectorAll('ct-button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].getAttribute('variant')).to.equal('primary');
    expect(buttons[0].getAttribute('label')).to.equal('Have your say');
    expect(buttons[1].getAttribute('variant')).to.equal('secondary');
    expect(buttons[1].getAttribute('label')).to.equal('Learn more');
    expect(buttons[1].hasAttribute('external')).to.be.true;
    expect(buttons[1].hasAttribute('new-window')).to.be.true;
  });

  it('renders no links markup when there are no ct-callout-link children', async () => {
    const el = (await fixture(html`<ct-callout heading="Just a heading"></ct-callout>`)) as CtCallout;
    expect(el.shadowRoot!.querySelector('ct-item-list')).to.not.exist;
  });

  it('applies the theme to the root element', async () => {
    const el = (await fixture(html`<ct-callout theme="dark" heading="Dark theme"></ct-callout>`)) as CtCallout;
    expect(el.shadowRoot!.querySelector('.ct-callout')!.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('applies vertical spacing as a modifier class', async () => {
    const el = (await fixture(
      html`<ct-callout heading="Spaced" vertical-spacing="both"></ct-callout>`,
    )) as CtCallout;
    expect(el.shadowRoot!.querySelector('.ct-callout')!.classList.contains('ct-vertical-spacing-inset--both')).to.be
      .true;
  });

  it('renders content-top/content-bottom slotted content only when provided', async () => {
    const el = (await fixture(html`
      <ct-callout heading="With extra content">
        <div slot="content-top">Top</div>
        <div slot="content-bottom">Bottom</div>
      </ct-callout>
    `)) as CtCallout;
    expect(el.shadowRoot!.querySelector('.ct-callout__content-top')).to.exist;
    expect(el.shadowRoot!.querySelector('.ct-callout__content-bottom')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
