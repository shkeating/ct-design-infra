import { html, fixture, expect } from '@open-wc/testing';
import './chip';
import type { CtChip } from './chip';

describe('ct-chip', () => {
  it('renders correctly as a default span', async () => {
    const el = await fixture<CtChip>(html`<ct-chip content="Test Chip"></ct-chip>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Chip');
    expect(el.shadowRoot!.querySelector('span.ct-chip')).to.exist;
  });

  it('renders as a label wrapping a radio input when kind="input"', async () => {
    const el = await fixture<CtChip>(html`<ct-chip kind="input" content="Filter"></ct-chip>`);
    const input = el.shadowRoot!.querySelector('input.ct-chip__input');
    expect(input).to.exist;
    expect(input!.getAttribute('type')).to.equal('radio');
  });

  it('reflects selected as a checked input when kind="input"', async () => {
    const el = await fixture<CtChip>(html`<ct-chip kind="input" content="Filter" selected></ct-chip>`);
    const input = el.shadowRoot!.querySelector('input.ct-chip__input') as HTMLInputElement;
    expect(input.checked).to.be.true;
  });

  it('renders as a link when kind="link" and url is set', async () => {
    const el = await fixture<CtChip>(
      html`<ct-chip kind="link" content="Transport" url="/news?tag=transport" label="Filter by Transport"></ct-chip>`,
    );
    const anchor = el.shadowRoot!.querySelector('a.ct-chip');
    expect(anchor).to.exist;
    expect(anchor!.getAttribute('href')).to.equal('/news?tag=transport');
    expect(anchor!.getAttribute('aria-label')).to.equal('Filter by Transport');
  });

  it('falls back to a span when kind="link" but no url is provided', async () => {
    const el = await fixture<CtChip>(html`<ct-chip kind="link" content="No URL"></ct-chip>`);
    expect(el.shadowRoot!.querySelector('a.ct-chip')).to.not.exist;
    expect(el.shadowRoot!.querySelector('span.ct-chip')).to.exist;
  });

  it('renders nothing when content is empty', async () => {
    const el = await fixture<CtChip>(html`<ct-chip></ct-chip>`);
    expect(el.shadowRoot!.querySelector('.ct-chip')).to.not.exist;
  });

  it('passes accessibility audits (default)', async () => {
    const el = await fixture(html`<ct-chip content="Accessible Chip"></ct-chip>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audits (input kind)', async () => {
    const el = await fixture(html`<ct-chip kind="input" content="Accessible Filter Chip"></ct-chip>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audits (link kind)', async () => {
    const el = await fixture(
      html`<ct-chip kind="link" content="Accessible Link Chip" url="#" label="Accessible Link Chip"></ct-chip>`,
    );
    await expect(el).to.be.accessible();
  });
});
