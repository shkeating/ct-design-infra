import { html, fixture, expect } from '@open-wc/testing';
import './video';
import type { CtVideo } from './video';

describe('ct-video', () => {
  it('renders a video with the given src and type', async () => {
    const el = await fixture<CtVideo>(
      html`<ct-video src="/test.webm" type="video/webm"></ct-video>`,
    );
    const video = el.shadowRoot!.querySelector('video.ct-video') as HTMLVideoElement;
    expect(video).to.exist;
    const source = video.querySelector('source') as HTMLSourceElement;
    expect(source).to.exist;
    expect(source.getAttribute('src')).to.equal('/test.webm');
    expect(source.getAttribute('type')).to.equal('video/webm');
  });

  it('applies the theme class', async () => {
    const el = await fixture<CtVideo>(
      html`<ct-video src="/test.webm" theme="dark"></ct-video>`,
    );
    const video = el.shadowRoot!.querySelector('video') as HTMLVideoElement;
    expect(video.classList.contains('ct-theme-dark')).to.be.true;
  });

  it('reflects has-controls and poster onto the native attributes', async () => {
    const el = await fixture<CtVideo>(
      html`<ct-video src="/test.webm" has-controls poster="/poster.png"></ct-video>`,
    );
    const video = el.shadowRoot!.querySelector('video') as HTMLVideoElement;
    expect(video.hasAttribute('controls')).to.be.true;
    expect(video.getAttribute('poster')).to.equal('/poster.png');
  });

  it('passes width/height through as native attributes', async () => {
    const el = await fixture<CtVideo>(
      html`<ct-video src="/test.webm" width="320" height="180"></ct-video>`,
    );
    const video = el.shadowRoot!.querySelector('video') as HTMLVideoElement;
    expect(video.getAttribute('width')).to.equal('320');
    expect(video.getAttribute('height')).to.equal('180');
  });

  it('shows fallback text for browsers without HTML5 video support', async () => {
    const el = await fixture<CtVideo>(
      html`<ct-video src="/test.webm" fallback-text="No video for you."></ct-video>`,
    );
    const video = el.shadowRoot!.querySelector('video') as HTMLVideoElement;
    expect(video.textContent).to.include('No video for you.');
  });

  it('renders nothing when src is empty', async () => {
    const el = await fixture<CtVideo>(html`<ct-video></ct-video>`);
    expect(el.shadowRoot!.querySelector('video')).to.not.exist;
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(
      html`<ct-video src="/test.webm" title="Accessible video" has-controls></ct-video>`,
    );
    await expect(el).to.be.accessible();
  });
});
