import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import type { CtBanner } from './banner.js';
import './banner.js';
import '../../02-molecules/breadcrumb/breadcrumb.js';
import '../../02-molecules/breadcrumb/breadcrumb-item.js';

const markup = html`
  <ct-banner
    theme="light"
    is-decorative
    site-section="Site section name"
    title="Providing visually engaging digital experiences"
    featured-image-url="https://example.com/featured.jpg"
    featured-image-alt="A featured image"
    background-image-url="https://example.com/background.png"
    background-image-alt="A background image"
    background-image-blend-mode="multiply"
  >
    <ct-breadcrumb slot="breadcrumb" theme="light">
      <ct-breadcrumb-item text="Home" url="https://example.com"></ct-breadcrumb-item>
      <ct-breadcrumb-item text="Current page"></ct-breadcrumb-item>
    </ct-breadcrumb>
    <div slot="content"><p>Main content.</p></div>
    <div slot="content-below"><p>Below content.</p></div>
  </ct-banner>
`;

describe('ct-banner', () => {
  it('renders the site-section and title via nested ct-heading elements', async () => {
    const el = (await fixture(markup)) as CtBanner;
    const headings = el.shadowRoot!.querySelectorAll('ct-heading');
    expect(headings.length).to.equal(2);
    expect((headings[0] as HTMLElement & { content: string; level: string }).content).to.equal('Site section name');
    expect((headings[0] as HTMLElement & { level: string }).level).to.equal('5');
    expect((headings[1] as HTMLElement & { content: string }).content).to.equal(
      'Providing visually engaging digital experiences',
    );
    expect((headings[1] as HTMLElement & { level: string }).level).to.equal('1');
  });

  it('renders the featured image via a nested ct-image element', async () => {
    const el = (await fixture(markup)) as CtBanner;
    const image = el.shadowRoot!.querySelector('ct-image');
    expect(image).to.exist;
    expect((image as HTMLElement & { url: string }).url).to.equal('https://example.com/featured.jpg');
    expect((image as HTMLElement & { alt: string }).alt).to.equal('A featured image');
  });

  it('paints the background image via inline style, not an <img>/ct-image', async () => {
    const el = (await fixture(markup)) as CtBanner;
    const inner = el.shadowRoot!.querySelector('.ct-banner__inner') as HTMLElement;
    expect(inner.style.backgroundImage).to.include('https://example.com/background.png');
    expect(inner.style.backgroundBlendMode).to.equal('multiply');
  });

  it('exposes background image alt text via a visually-hidden role="img" span', async () => {
    const el = (await fixture(markup)) as CtBanner;
    const span = el.shadowRoot!.querySelector('.ct-banner__background-image-alt');
    expect(span).to.exist;
    expect(span!.getAttribute('aria-label')).to.equal('A background image');
  });

  it('slots a consumer-composed ct-breadcrumb rather than re-implementing breadcrumb markup', async () => {
    const el = (await fixture(markup)) as CtBanner;
    const slot = el.shadowRoot!.querySelector('slot[name="breadcrumb"]') as HTMLSlotElement;
    const assigned = slot.assignedElements();
    expect(assigned.length).to.equal(1);
    expect(assigned[0].tagName.toLowerCase()).to.equal('ct-breadcrumb');
  });

  it('applies the decorative modifier class when is-decorative is set', async () => {
    const el = (await fixture(markup)) as CtBanner;
    const root = el.shadowRoot!.querySelector('.ct-banner');
    expect(root!.classList.contains('ct-banner--decorative')).to.be.true;
  });

  it('collapses a content row whose slot has no assigned content', async () => {
    const el = (await fixture(html`<ct-banner theme="light" title="Just a title"></ct-banner>`)) as CtBanner;
    // Slot-emptiness detection runs in firstUpdated/slotchange - allow a tick.
    await aTimeout(0);
    const contentRow = el.shadowRoot!.querySelector('.ct-banner__content')!.closest('.ct-banner__row');
    expect(contentRow!.classList.contains('ct-banner__row--empty')).to.be.true;
  });

  it('does not collapse a content row whose slot has assigned content', async () => {
    const el = (await fixture(markup)) as CtBanner;
    await aTimeout(0);
    const contentRow = el.shadowRoot!.querySelector('.ct-banner__content')!.closest('.ct-banner__row');
    expect(contentRow!.classList.contains('ct-banner__row--empty')).to.be.false;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
