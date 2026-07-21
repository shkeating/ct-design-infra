import { html, fixture, expect } from '@open-wc/testing';
import type { CtItemList } from './item-list.js';
import './item-list.js';
import './item-list-item.js';

const markup = html`
  <ct-item-list>
    <ct-item-list-item><p>First item</p></ct-item-list-item>
    <ct-item-list-item><p>Second item</p></ct-item-list-item>
    <ct-item-list-item><p>Third item</p></ct-item-list-item>
  </ct-item-list>
`;

describe('ct-item-list', () => {
  it('renders a semantic list with one <li> per item', async () => {
    const el = (await fixture(markup)) as CtItemList;
    const listItems = el.shadowRoot!.querySelectorAll('li.ct-item-list__item');
    expect(listItems.length).to.equal(3);
    expect(el.shadowRoot!.querySelector('ul.ct-item-list')).to.exist;
  });

  it('defaults to horizontal, regular size, with gaps', async () => {
    const el = (await fixture(markup)) as CtItemList;
    const list = el.shadowRoot!.querySelector('ul')!;
    expect(list.classList.contains('ct-item-list--horizontal')).to.be.true;
    expect(list.classList.contains('ct-item-list--regular')).to.be.true;
    expect(list.classList.contains('ct-item-list--no-gap')).to.be.false;
  });

  it('reflects the direction, size, and no-gap attributes onto the rendered list', async () => {
    const el = (await fixture(html`
      <ct-item-list direction="vertical" size="large" no-gap>
        <ct-item-list-item>A</ct-item-list-item>
      </ct-item-list>
    `)) as CtItemList;
    const list = el.shadowRoot!.querySelector('ul')!;
    expect(list.classList.contains('ct-item-list--vertical')).to.be.true;
    expect(list.classList.contains('ct-item-list--large')).to.be.true;
    expect(list.classList.contains('ct-item-list--no-gap')).to.be.true;
  });

  it('projects each item into its own list item slot', async () => {
    const el = (await fixture(markup)) as CtItemList;
    const items = Array.from(el.querySelectorAll('ct-item-list-item'));
    expect(items[0].getAttribute('slot')).to.equal('item-0');
    expect(items[1].getAttribute('slot')).to.equal('item-1');
    expect(items[2].getAttribute('slot')).to.equal('item-2');
  });

  it('applies an additional modifier class when provided', async () => {
    const el = (await fixture(html`
      <ct-item-list modifier-class="custom-list">
        <ct-item-list-item>A</ct-item-list-item>
      </ct-item-list>
    `)) as CtItemList;
    const list = el.shadowRoot!.querySelector('ul')!;
    expect(list.classList.contains('custom-list')).to.be.true;
  });

  it('renders an empty list gracefully with no children', async () => {
    const el = (await fixture(html`<ct-item-list></ct-item-list>`)) as CtItemList;
    const listItems = el.shadowRoot!.querySelectorAll('li.ct-item-list__item');
    expect(listItems.length).to.equal(0);
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
