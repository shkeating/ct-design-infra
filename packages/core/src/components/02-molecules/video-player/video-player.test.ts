import { html, fixture, expect } from '@open-wc/testing';
import type { CtVideoPlayer } from './video-player.js';
import './video-player.js';

describe('ct-video-player', () => {
  it('renders nothing when no media source is provided', async () => {
    const el = (await fixture(html`<ct-video-player></ct-video-player>`)) as CtVideoPlayer;
    expect(el.shadowRoot!.querySelector('.ct-video-player')).to.be.null;
  });

  it('composes ct-video for the source-url path', async () => {
    const el = (await fixture(
      html`<ct-video-player source-url="video.mp4" source-type="video/mp4" poster="poster.jpg"></ct-video-player>`,
    )) as CtVideoPlayer;
    const video = el.shadowRoot!.querySelector('ct-video');
    expect(video).to.exist;
    expect(video!.getAttribute('src')).to.equal('video.mp4');
    expect(video!.getAttribute('poster')).to.equal('poster.jpg');
    expect(el.shadowRoot!.querySelector('ct-iframe')).to.be.null;
  });

  it('composes ct-iframe for the embedded-source path', async () => {
    const el = (await fixture(
      html`<ct-video-player embedded-source="https://example.com/embed" frame-title="Example video"></ct-video-player>`,
    )) as CtVideoPlayer;
    const iframe = el.shadowRoot!.querySelector('ct-iframe');
    expect(iframe).to.exist;
    expect(iframe!.getAttribute('url')).to.equal('https://example.com/embed');
    expect(iframe!.getAttribute('title')).to.equal('Example video');
    expect(iframe!.hasAttribute('allow-fullscreen')).to.be.true;
    expect(el.shadowRoot!.querySelector('ct-video')).to.be.null;
  });

  it('renders raw-source HTML when neither source-url nor embedded-source is set', async () => {
    const el = (await fixture(
      html`<ct-video-player raw-source="<iframe src=&quot;https://example.com&quot;></iframe>"></ct-video-player>`,
    )) as CtVideoPlayer;
    expect(el.shadowRoot!.querySelector('.ct-video-player__wrapper iframe')).to.exist;
  });

  it('renders a transcript link via ct-link when transcript-url is set', async () => {
    const el = (await fixture(
      html`<ct-video-player
        source-url="video.mp4"
        transcript-text="View transcript"
        transcript-url="https://example.com/transcript"
      ></ct-video-player>`,
    )) as CtVideoPlayer;
    const link = el.shadowRoot!.querySelector('ct-link');
    expect(link).to.exist;
    expect(link!.getAttribute('label')).to.equal('View transcript');
    expect(link!.getAttribute('url')).to.equal('https://example.com/transcript');
  });

  it('does not render a transcript link when transcript-url is unset', async () => {
    const el = (await fixture(html`<ct-video-player source-url="video.mp4"></ct-video-player>`)) as CtVideoPlayer;
    expect(el.shadowRoot!.querySelector('ct-link')).to.be.null;
  });

  it('renders a collapsed transcript disclosure when transcript-content is set, and expands it on click', async () => {
    const el = (await fixture(
      html`<ct-video-player source-url="video.mp4" transcript-content="<p>Transcript text.</p>"></ct-video-player>`,
    )) as CtVideoPlayer;

    const toggle = el.shadowRoot!.querySelector('ct-button.ct-video-player__transcript-toggle');
    expect(toggle).to.exist;
    expect(toggle!.getAttribute('aria-expanded')).to.equal('false');

    const panel = el.shadowRoot!.querySelector('.ct-video-player__transcript-panel');
    expect(panel!.hasAttribute('hidden')).to.be.true;

    const basicContent = panel!.querySelector('ct-basic-content');
    expect(basicContent).to.exist;
    expect(basicContent!.getAttribute('content')).to.equal('<p>Transcript text.</p>');

    // Click the toggle's actual inner <button> (cross-shadow-DOM interaction, not just the
    // outer ct-button host) to confirm the Zag collapsible machine's state genuinely
    // propagates through to both the outer host and its shadow-internal control.
    const innerButton = toggle!.shadowRoot!.querySelector('button')!;
    innerButton.focus();
    innerButton.click();
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('ct-button.ct-video-player__transcript-toggle')!.getAttribute('aria-expanded')).to.equal(
      'true',
    );
    expect(el.shadowRoot!.querySelector('.ct-video-player__transcript-panel')!.hasAttribute('hidden')).to.be.false;
  });

  it('does not render a transcript disclosure when transcript-content is unset', async () => {
    const el = (await fixture(html`<ct-video-player source-url="video.mp4"></ct-video-player>`)) as CtVideoPlayer;
    expect(el.shadowRoot!.querySelector('.ct-video-player__transcript-panel')).to.be.null;
  });

  it('passes accessibility audits with a fully composed instance', async () => {
    const el = await fixture(html`
      <ct-video-player
        theme="light"
        source-url="video.mp4"
        source-type="video/mp4"
        poster="poster.jpg"
        transcript-text="View transcript"
        transcript-url="https://example.com/transcript"
        transcript-content="<p>Transcript text.</p>"
      ></ct-video-player>
    `);
    await expect(el).to.be.accessible();
  });
});
