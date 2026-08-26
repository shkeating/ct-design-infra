import { html, fixture, expect } from '@open-wc/testing';
import type { CtTableOfContents } from './table-of-contents.js';
import './table-of-contents.js';
import './table-of-contents-item.js';

const markup = html`
  <ct-table-of-contents heading="On this page">
    <ct-table-of-contents-item text="Introduction" url="#introduction"></ct-table-of-contents-item>
    <ct-table-of-contents-item text="Configuring your project" url="#configuring-your-project"></ct-table-of-contents-item>
  </ct-table-of-contents>
`;

describe('ct-table-of-contents', () => {
  it('renders a heading and a link for every item', async () => {
    const el = (await fixture(markup)) as CtTableOfContents;
    const heading = el.shadowRoot!.querySelector('.ct-table-of-contents__title');
    expect(heading).to.exist;
    expect(heading!.textContent).to.equal('On this page');

    const links = el.shadowRoot!.querySelectorAll('.ct-table-of-contents__link');
    expect(links.length).to.equal(2);
    expect(links[0].getAttribute('href')).to.equal('#introduction');
    expect(links[0].textContent).to.equal('Introduction');
    expect(links[1].getAttribute('href')).to.equal('#configuring-your-project');
  });

  it('omits the heading when none is provided', async () => {
    const el = (await fixture(html`
      <ct-table-of-contents>
        <ct-table-of-contents-item text="Introduction" url="#introduction"></ct-table-of-contents-item>
      </ct-table-of-contents>
    `)) as CtTableOfContents;
    expect(el.shadowRoot!.querySelector('.ct-table-of-contents__title')).to.not.exist;
  });

  it('applies the theme and position classes to the root element', async () => {
    const el = (await fixture(html`
      <ct-table-of-contents theme="dark" position="after">
        <ct-table-of-contents-item text="Introduction" url="#introduction"></ct-table-of-contents-item>
      </ct-table-of-contents>
    `)) as CtTableOfContents;
    const root = el.shadowRoot!.querySelector('.ct-table-of-contents')!;
    expect(root.classList.contains('ct-theme-dark')).to.be.true;
    expect(root.classList.contains('ct-table-of-contents--position-after')).to.be.true;
  });

  it('renders nothing when there are no items', async () => {
    const el = (await fixture(html`<ct-table-of-contents heading="On this page"></ct-table-of-contents>`)) as CtTableOfContents;
    expect(el.shadowRoot!.querySelector('.ct-table-of-contents')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
