import { html, fixture, expect } from '@open-wc/testing';
import type { CtSocialLinks } from './social-links.js';
import './social-links.js';
import './social-links-item.js';

const markup = html`
  <ct-social-links theme="light">
    <ct-social-links-item icon="facebook" url="https://www.facebook.com" link-title="Facebook"></ct-social-links-item>
    <ct-social-links-item icon="instagram" url="https://www.instagram.com" link-title="Instagram"></ct-social-links-item>
    <ct-social-links-item icon="x" url="https://www.twitter.com" link-title="X"></ct-social-links-item>
  </ct-social-links>
`;

describe('ct-social-links', () => {
  it('renders one ct-button per ct-social-links-item, composed via ct-item-list', async () => {
    const el = (await fixture(markup)) as CtSocialLinks;
    const list = el.shadowRoot!.querySelector('ct-item-list');
    expect(list).to.exist;
    const buttons = el.shadowRoot!.querySelectorAll('ct-button');
    expect(buttons.length).to.equal(3);
    const listItems = el.shadowRoot!.querySelectorAll('ct-item-list-item');
    expect(listItems.length).to.equal(3);
  });

  it('passes the icon and url through to the underlying ct-button as a tertiary link', async () => {
    const el = (await fixture(markup)) as CtSocialLinks;
    const button = el.shadowRoot!.querySelector('ct-button')!;
    expect(button.getAttribute('icon')).to.equal('facebook');
    expect(button.getAttribute('url')).to.equal('https://www.facebook.com');
    expect(button.getAttribute('kind')).to.equal('link');
    expect(button.getAttribute('variant')).to.equal('tertiary');
  });

  it('gives each icon-only button a visually-hidden accessible name from link-title', async () => {
    const el = (await fixture(markup)) as CtSocialLinks;
    const button = el.shadowRoot!.querySelector('ct-button')!;
    const hiddenLabel = button.querySelector('.ct-social-links__visually-hidden');
    expect(hiddenLabel).to.exist;
    expect(hiddenLabel!.textContent).to.equal('Facebook');
  });

  it('defaults to light theme with no border', async () => {
    const el = (await fixture(markup)) as CtSocialLinks;
    const root = el.shadowRoot!.querySelector('.ct-social-links')!;
    expect(root.classList.contains('ct-theme-light')).to.be.true;
    expect(root.classList.contains('ct-social-links--with-border')).to.be.false;
  });

  it('reflects the theme and with-border attributes', async () => {
    const el = (await fixture(html`
      <ct-social-links theme="dark" with-border>
        <ct-social-links-item icon="youtube" url="https://www.youtube.com" link-title="YouTube"></ct-social-links-item>
      </ct-social-links>
    `)) as CtSocialLinks;
    const root = el.shadowRoot!.querySelector('.ct-social-links')!;
    expect(root.classList.contains('ct-theme-dark')).to.be.true;
    expect(root.classList.contains('ct-social-links--with-border')).to.be.true;
  });

  it('projects custom slotted icon content in place of the named icon, mirroring icon_html', async () => {
    const el = (await fixture(html`
      <ct-social-links>
        <ct-social-links-item url="https://www.dropbox.com" link-title="Dropbox">
          <img class="custom-icon" width="16" height="16" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7" />
        </ct-social-links-item>
      </ct-social-links>
    `)) as CtSocialLinks;
    const button = el.shadowRoot!.querySelector('ct-button')!;
    expect(button.hasAttribute('icon')).to.be.false;
    const projectedImg = el.querySelector('ct-social-links-item img.custom-icon');
    expect(projectedImg).to.exist;
  });

  it('renders nothing gracefully with no children', async () => {
    const el = (await fixture(html`<ct-social-links></ct-social-links>`)) as CtSocialLinks;
    expect(el.shadowRoot!.querySelector('.ct-social-links')).to.not.exist;
  });

  it('passes accessibility audits when every link has a link-title', async () => {
    const el = await fixture(markup);
    await expect(el).to.be.accessible();
  });
});
