import { html, fixture, expect } from '@open-wc/testing';
import type { CtTagList } from './tag-list.js';
import './tag-list.js';
import './tag-list-item.js';

const markup = html`
  <ct-tag-list theme="light">
    <ct-tag-list-item content="Health"></ct-tag-list-item>
    <ct-tag-list-item content="Education"></ct-tag-list-item>
    <ct-tag-list-item content="Transport" url="https://example.com/transport"></ct-tag-list-item>
  </ct-tag-list>
`;

describe('ct-tag-list', () => {
  it('renders one ct-tag per ct-tag-list-item, composed via ct-item-list', async () => {
    const el = (await fixture(markup)) as CtTagList;
    const list = el.shadowRoot!.querySelector('ct-item-list');
    expect(list).to.exist;
    const tags = el.shadowRoot!.querySelectorAll('ct-tag');
    expect(tags.length).to.equal(3);
    const listItems = el.shadowRoot!.querySelectorAll('ct-item-list-item');
    expect(listItems.length).to.equal(3);
  });

  it('passes content/url/new-window through to the underlying ct-tag', async () => {
    const el = (await fixture(markup)) as CtTagList;
    const tags = el.shadowRoot!.querySelectorAll('ct-tag');
    expect(tags[0].getAttribute('label')).to.equal('Health');
    expect(tags[2].getAttribute('url')).to.equal('https://example.com/transport');
  });

  it("defaults each tag's theme to the list's own theme", async () => {
    const el = (await fixture(html`
      <ct-tag-list theme="dark">
        <ct-tag-list-item content="Dark Default"></ct-tag-list-item>
      </ct-tag-list>
    `)) as CtTagList;
    const tag = el.shadowRoot!.querySelector('ct-tag')!;
    expect(tag.getAttribute('theme')).to.equal('dark');
  });

  it("lets a tag item override the list's theme (mirrors upstream's {theme}|merge(tag))", async () => {
    const el = (await fixture(html`
      <ct-tag-list theme="light">
        <ct-tag-list-item content="Overridden" theme="dark"></ct-tag-list-item>
      </ct-tag-list>
    `)) as CtTagList;
    const tag = el.shadowRoot!.querySelector('ct-tag')!;
    expect(tag.getAttribute('theme')).to.equal('dark');
  });

  it('reflects the vertical-spacing attribute as a class', async () => {
    const el = (await fixture(html`
      <ct-tag-list vertical-spacing="both">
        <ct-tag-list-item content="Spaced"></ct-tag-list-item>
      </ct-tag-list>
    `)) as CtTagList;
    const root = el.shadowRoot!.querySelector('.ct-tag-list')!;
    expect(root.classList.contains('ct-vertical-spacing--both')).to.be.true;
  });

  it('renders nothing gracefully with no children', async () => {
    const el = (await fixture(html`<ct-tag-list></ct-tag-list>`)) as CtTagList;
    expect(el.shadowRoot!.querySelector('.ct-tag-list')).to.not.exist;
  });

  it('only renders content-top/content-bottom slots when actually slotted', async () => {
    const el = (await fixture(html`
      <ct-tag-list>
        <ct-tag-list-item content="Tag"></ct-tag-list-item>
      </ct-tag-list>
    `)) as CtTagList;
    expect(el.shadowRoot!.querySelector('.ct-tag-list__content-top')).to.not.exist;
    expect(el.shadowRoot!.querySelector('.ct-tag-list__content-bottom')).to.not.exist;

    const withSlots = (await fixture(html`
      <ct-tag-list>
        <div slot="content-top">Filter by topic</div>
        <ct-tag-list-item content="Tag"></ct-tag-list-item>
        <div slot="content-bottom">Clear all</div>
      </ct-tag-list>
    `)) as CtTagList;
    expect(withSlots.shadowRoot!.querySelector('.ct-tag-list__content-top')).to.exist;
    expect(withSlots.shadowRoot!.querySelector('.ct-tag-list__content-bottom')).to.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
