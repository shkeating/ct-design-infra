import { html, fixture, expect } from '@open-wc/testing';
import type { CtBreadcrumb } from './breadcrumb.js';
import './breadcrumb.js';
import './breadcrumb-item.js';

const markup = html`
  <ct-breadcrumb>
    <ct-breadcrumb-item text="Home" url="/"></ct-breadcrumb-item>
    <ct-breadcrumb-item text="Section" url="/section"></ct-breadcrumb-item>
    <ct-breadcrumb-item text="Current page"></ct-breadcrumb-item>
  </ct-breadcrumb>
`;

describe('ct-breadcrumb', () => {
  it('renders a nav landmark with an accessible label', async () => {
    const el = (await fixture(markup)) as CtBreadcrumb;
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).to.exist;
    expect(nav!.getAttribute('aria-label')).to.equal('breadcrumb');
  });

  it('renders a link for every crumb except the last', async () => {
    const el = (await fixture(markup)) as CtBreadcrumb;
    const links = el.shadowRoot!.querySelectorAll('.ct-breadcrumb__links--full ct-link');
    expect(links.length).to.equal(2);
  });

  it('renders the final crumb as plain text with aria-current by default', async () => {
    const el = (await fixture(markup)) as CtBreadcrumb;
    const active = el.shadowRoot!.querySelector('.ct-breadcrumb__links--full .ct-breadcrumb__links__link--active');
    expect(active).to.exist;
    expect(active!.tagName).to.equal('SPAN');
    expect(active!.getAttribute('aria-current')).to.equal('location');
    expect(active!.textContent).to.include('Current page');
  });

  it('renders the final crumb as a real link when active-is-link is set and a URL is present', async () => {
    const el = (await fixture(html`
      <ct-breadcrumb active-is-link>
        <ct-breadcrumb-item text="Home" url="/"></ct-breadcrumb-item>
        <ct-breadcrumb-item text="Current page" url="/current"></ct-breadcrumb-item>
      </ct-breadcrumb>
    `)) as CtBreadcrumb;
    const active = el.shadowRoot!.querySelector('.ct-breadcrumb__links--full .ct-breadcrumb__links__link--active');
    expect(active!.tagName).to.equal('A');
    expect(active!.getAttribute('href')).to.equal('/current');
    expect(active!.getAttribute('aria-current')).to.equal('location');
  });

  it('renders a separator icon between crumbs but not after the last one', async () => {
    const el = (await fixture(markup)) as CtBreadcrumb;
    const separators = el.shadowRoot!.querySelectorAll('.ct-breadcrumb__links--full .ct-breadcrumb__links__separator');
    expect(separators.length).to.equal(2);
  });

  it('renders a compact mobile "back" link to the second-to-last crumb', async () => {
    const el = (await fixture(markup)) as CtBreadcrumb;
    const mobileLink = el.shadowRoot!.querySelector('.ct-breadcrumb__links--mobile ct-link');
    expect(mobileLink).to.exist;
    expect(mobileLink!.getAttribute('label')).to.equal('Section');
    expect(mobileLink!.getAttribute('icon')).to.equal('left-arrow');
  });

  it('omits the mobile "back" link when there is only one crumb', async () => {
    const el = (await fixture(html`
      <ct-breadcrumb>
        <ct-breadcrumb-item text="Home"></ct-breadcrumb-item>
      </ct-breadcrumb>
    `)) as CtBreadcrumb;
    expect(el.shadowRoot!.querySelector('.ct-breadcrumb__links--mobile')).to.not.exist;
  });

  it('renders nothing when there are no crumbs', async () => {
    const el = (await fixture(html`<ct-breadcrumb></ct-breadcrumb>`)) as CtBreadcrumb;
    expect(el.shadowRoot!.querySelector('nav')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
