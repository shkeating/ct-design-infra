import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type VideoTheme = 'light' | 'dark';

/**
 * A Generative UI-ready Video component based on CivicTheme, rendering a single
 * `<video>` element with a theme class. Mirrors the upstream `video.twig`: renders
 * nothing when `src` is empty, threads `title`/`controls`/`poster`/`width`/`height`
 * straight through as native HTML attributes, and falls back to `fallbackText` for
 * browsers without HTML5 video support.
 *
 * NOTE on `sources` (upstream array prop): upstream `video.twig` accepts a `sources`
 * array (each item an `{ url, type }` pair) and loops it into multiple `<source>`
 * children, letting the browser pick the first playable format. This repo's
 * convention disallows array/object props (attributes stay plain strings/booleans
 * so an LLM can emit them directly), and the usual escape hatch for repeatable
 * child data — a light-DOM child element slotted in, as `ct-accordion-item` is for
 * `ct-accordion` — does not work here: native `<source>` matching only looks at a
 * `<video>` element's actual DOM children, and content projected into a `<slot>`
 * inside this component's shadow root is never actually reparented into the real
 * `<video>`'s child list (unlike `ct-accordion`, which is a plain container that
 * doesn't care what tag name its slotted content has). So this component collapses
 * `sources` to a single `src` + `type` pair rather than attempting multi-source
 * fallback. This is a reasonable simplification today — the codec fragmentation
 * that motivated shipping 2-3 fallback formats (webm/mp4/ogg) in upstream's demo is
 * largely resolved in current evergreen browsers — and keeps the prop surface
 * GenUI-friendly. Flagged here as a deliberate, documented scope reduction rather
 * than an oversight.
 *
 * Upstream ships no compiled CSS for this atom at all — `packages/sdc/components/
 * 01-atoms/video/` has no `video.css`, and no `.ct-video` selector appears anywhere
 * in `civictheme.base.css` (same situation as `ct-image`). The one exception:
 * `civictheme.variables.css` does define `--ct-video-ratio-width: 16` and
 * `--ct-video-ratio-height: 9`, unused by any compiled component CSS upstream, but
 * clearly scoped to this component by name — reconciled here as
 * `packages/tokens/src/components/video.json` and applied as a default 16:9
 * `aspect-ratio` on the host so the element reserves sensible layout space before
 * the video's intrinsic dimensions are known, matching what those tokens are
 * evidently for. This is the only styling beyond a token-free responsive baseline.
 */
@customElement('ct-video')
export class CtVideo extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 100%;
    }

    .ct-video {
      display: block;
      max-width: 100%;
      background-color: #000;
    }

    /* No explicit intrinsic dimensions: fill the container width and fall back to
       the token-defined 16:9 ratio. When width/height attributes ARE provided,
       leave them alone so the native attributes govern the rendered size (matches
       upstream, which passes width/height straight through with no forced ratio) —
       only capped by max-width above so it still shrinks on narrow viewports. */
    .ct-video:not([width]):not([height]) {
      width: 100%;
      height: auto;
      aspect-ratio: var(--ct-video-ratio-width) / var(--ct-video-ratio-height);
    }
  `;

  /** Theme variation: light or dark. Carried through as a class for parity with upstream markup; the base atom has no theme-specific CSS. */
  @property({ type: String }) theme: VideoTheme = 'light';

  /** Video title, threaded through as the native `title` attribute (tooltip / accessible name assist). */
  @property({ type: String, attribute: 'title' }) videoTitle?: string;

  /** Whether the video should show native playback controls. */
  @property({ type: Boolean, attribute: 'has-controls' }) hasControls = false;

  /** Video source URL. Renders nothing when empty (matches upstream). */
  @property({ type: String }) src?: string;

  /** Video source MIME type (e.g. `video/mp4`, `video/webm`). */
  @property({ type: String }) type?: string;

  /** Poster image URL, shown before playback starts. */
  @property({ type: String }) poster?: string;

  /** Video width (intrinsic, in pixels). Passed through as the native `width` attribute. */
  @property({ type: Number }) width?: number;

  /** Video height (intrinsic, in pixels). Passed through as the native `height` attribute. */
  @property({ type: Number }) height?: number;

  /** Message shown to browsers that don't support the HTML5 `<video>` element. */
  @property({ type: String, attribute: 'fallback-text' }) fallbackText =
    "Your browser doesn't support HTML5 video.";

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  render() {
    if (!this.src) {
      return nothing;
    }

    const classes = {
      'ct-video': true,
      [`ct-theme-${this.theme}`]: true,
      [this.modifierClass]: !!this.modifierClass,
    };

    return html`
      <video
        class=${classMap(classes)}
        title=${ifDefined(this.videoTitle)}
        ?controls=${this.hasControls}
        poster=${ifDefined(this.poster)}
        width=${ifDefined(this.width)}
        height=${ifDefined(this.height)}
        data-component-name="video"
      >
        <source src=${this.src} type=${ifDefined(this.type)} />
        ${this.fallbackText}
      </video>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-video': CtVideo;
  }
}
