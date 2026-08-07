import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { machine, connect } from '@zag-js/collapsible';
import type { Props as CollapsibleProps } from '@zag-js/collapsible';
import { createMachineService, type MachineService } from '../../../lib/zag/create-machine-service.js';
import { domNormalizer } from '../../../lib/zag/normalize-props.js';
import { BreakpointM } from '@ct-infra/tokens';
import '../../01-atoms/video/video.js';
import '../../01-atoms/iframe/iframe.js';
import '../../01-atoms/link/link.js';
import '../../01-atoms/button/button.js';
import '../basic-content/basic-content.js';

export type VideoPlayerTheme = 'light' | 'dark';
export type VideoPlayerVerticalSpacing = 'top' | 'bottom' | 'both' | 'none';

const VALID_SPACING: VideoPlayerVerticalSpacing[] = ['top', 'bottom', 'both', 'none'];

let instanceCount = 0;

/**
 * A Generative UI-ready Video Player component based on CivicTheme. The most
 * composition-heavy component ported so far: it composes five already-ported elements
 * internally rather than reimplementing any of their rendering, mirroring upstream
 * `video-player.twig`'s own `civictheme:video` / `civictheme:iframe` / `civictheme:link` /
 * `civictheme:button` / `civictheme:basic-content` includes —
 * - `ct-video` for the `sources`-array path (further collapsed to a single `source-url`/
 *   `source-type` pair, inheriting `ct-video`'s own already-documented simplification of the
 *   same upstream array prop — no new deviation introduced here).
 * - `ct-iframe` for the `embedded_source` path (e.g. an embedded YouTube player).
 * - raw, trusted HTML via `unsafeHTML` for the `raw_source` path (mirrors upstream's own
 *   `{{ raw_source }}` - callers must not pass unsanitized input, same contract as
 *   `ct-basic-content`'s `content`).
 * - `ct-link` for the optional transcript link ("View transcript").
 * - `ct-button` (variant `tertiary`) for the optional transcript show/hide disclosure trigger,
 *   driven by `@zag-js/collapsible` (upstream drives the equivalent vanilla-JS
 *   `data-collapsible` behavior; this is the first component in this repo to need that
 *   specific Zag package, added as a new dependency - see porting summary).
 * - `ct-basic-content` for the optional transcript text content.
 *
 * Deviations from upstream, made non-interactively while porting (see docs/parallel-porting.md):
 * - Upstream's `title` prop (used only to set the embedded iframe's `title` attribute) is
 *   exposed here as `frame-title` instead. Plain `title` is a global HTML attribute that
 *   triggers the browser's native hover tooltip on ANY element (including custom elements)
 *   purely from its presence - keeping the upstream name would have silently given every
 *   `ct-video-player` host a native tooltip. Same reasoning `ct-callout` already documented
 *   for its own `heading` rename.
 * - The transcript link is composed via `ct-link`, which does not (yet) support upstream's
 *   `size: 'small'` typography variant passed to `civictheme:link` here - `ct-link` was
 *   already ported/merged with only its default (regular) label size. The transcript link
 *   therefore renders slightly larger than upstream. Flagged rather than extending `ct-link`
 *   for a single cosmetic variant outside this port's scope.
 * - `ct-button` gained `aria-expanded`/`aria-controls` passthrough properties (mirroring
 *   `ct-link`'s identical addition for `ct-popover`) so the Zag collapsible machine's trigger
 *   ARIA state lands on `ct-button`'s actual internal `<button>` rather than being inert on
 *   the outer host tag. `ct-iframe` gained an `allow-fullscreen` property (upstream sets
 *   `allowfullscreen` unconditionally on its own iframe include for embedded video providers).
 *   Both are documented, additive extensions to already-merged shared atoms - see porting
 *   summary.
 * - Not part of upstream's `transcript_link` object: `transcript-aria-label`. The transcript
 *   link always renders with a leading `eye` icon, so a `transcript-url` set without
 *   `transcript-text` produces an icon-only, unlabeled `ct-link` (axe `link-name`) with no way
 *   to fix it from any other prop on this component. Empirically verified against a live
 *   instance: axe's `link-name` rule correctly traverses two levels of nested shadow DOM
 *   (`ct-video-player` → `ct-link` → its own `<a>`) and FAILs with no name source, PASSes once
 *   `transcript-aria-label` is set - see `video-player.a11y-conditional.e2e.ts`.
 *
 * `packages/core/src/lib/zag/create-machine-service.ts` (the shared, generically-typed Zag
 * adapter every machine-driven component in this codebase reuses) needed one fix to support
 * `@zag-js/collapsible`: its `refs` handling forwarded a machine's `refs()` factory output as a
 * plain value object, but Zag's own `Service<T>` types `refs` as `BindableRefs<T>`
 * (`get(key)`/`set(key, value)`, exactly like `context`) - `ct-accordion`/`ct-tooltip`/
 * `ct-popover`'s machines never called `refs.get`/`refs.set`, so this never surfaced until
 * `@zag-js/collapsible`'s own actions did, throwing `refs.set is not a function` on every
 * disconnect. Fixed generically (wrapping each key in the existing, previously-unused
 * `bindable.ref` helper already defined in that file) rather than special-cased for this
 * component - flagged prominently in the porting summary as a shared-infrastructure fix, not a
 * per-component one.
 *
 * **Layout note (shadow-DOM composition):** upstream's aspect-ratio wrapper
 * (`.ct-video-player__wrapper`, `position: relative` + a `padding-bottom` percentage derived
 * from `--ct-video-ratio-width`/`--ct-video-ratio-height`) works by forcing any nested
 * `iframe`/`video` to `position: absolute; width: 100%; height: 100%` via a plain descendant
 * selector. Because the nested elements here are custom elements (`ct-video`/`ct-iframe`), not
 * bare native tags, this component's own `static styles` targets the tag selectors directly
 * (`.ct-video-player__wrapper ct-video`, `.ct-video-player__wrapper ct-iframe`) - this is
 * ordinary CSS applied to the HOST element's own box (position/width/height are unaffected by
 * the shadow boundary, unlike `display`/blockification - see the `ct-checkbox`/`ct-radio`
 * layout fix for that distinct failure mode). `ct-iframe`'s own internal
 * `.ct-iframe:not([width]) { width: 100% } .ct-iframe:not([height]) { height: 100% }` and
 * `ct-video`'s internal `aspect-ratio` fallback (both keyed off the *same*
 * `--ct-video-ratio-*` tokens this wrapper uses) mean the inner native `<video>`/`<iframe>`
 * correctly fills that host box once `width`/`height` attributes are omitted - verified with a
 * real Playwright bounding-box check (not just a screenshot) per this port's brief, since a
 * coincidental-looking match here is exactly the kind of thing that only proves out in a real
 * browser. The `ct-video-player__transcript-toggle` hover-underline rule is scoped to a literal
 * `class` attribute set directly on the `<ct-button>` HOST tag (not `modifier-class`, which
 * lands on an element inside `ct-button`'s own shadow root and would be unreachable from this
 * component's stylesheet) - the two trigger-label `<span>` children are genuine light-DOM
 * children of `<ct-button>` in this component's own render tree, so a plain descendant
 * selector against the host's literal class resolves entirely within elements this component
 * itself authors, without crossing into `ct-button`'s shadow root at all.
 */
@customElement('ct-video-player')
export class CtVideoPlayer extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .ct-video-player__wrapper {
      position: relative;
      padding-bottom: calc(var(--ct-video-ratio-height) / var(--ct-video-ratio-width) * 100%);
      padding-top: 1.5rem;
      height: 0;
      overflow: hidden;
    }

    .ct-video-player__wrapper iframe,
    .ct-video-player__wrapper video,
    .ct-video-player__wrapper ct-iframe,
    .ct-video-player__wrapper ct-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    /* Vertical spacing utility (mirrors CivicTheme's global .ct-vertical-spacing-inset--*
       utility - not present in video-player.css itself, same shared-utility situation
       ct-iframe/ct-basic-content already documented; reuses the exact same computed
       literal values those components use for the same utility). */
    .ct-video-player.ct-vertical-spacing-inset--top {
      padding-top: var(--ct-video-player-vertical-spacing);
    }
    .ct-video-player.ct-vertical-spacing-inset--bottom {
      padding-bottom: var(--ct-video-player-vertical-spacing);
    }
    .ct-video-player.ct-vertical-spacing-inset--both {
      padding-top: var(--ct-video-player-vertical-spacing);
      padding-bottom: var(--ct-video-player-vertical-spacing);
    }
    @media (min-width: ${unsafeCSS(BreakpointM)}) {
      .ct-video-player.ct-vertical-spacing-inset--top {
        padding-top: calc(var(--ct-video-player-vertical-spacing) * 2);
      }
      .ct-video-player.ct-vertical-spacing-inset--bottom {
        padding-bottom: calc(var(--ct-video-player-vertical-spacing) * 2);
      }
      .ct-video-player.ct-vertical-spacing-inset--both {
        padding-top: calc(var(--ct-video-player-vertical-spacing) * 2);
        padding-bottom: calc(var(--ct-video-player-vertical-spacing) * 2);
      }
    }

    /* No matching tokens found in civictheme.variables.css for any of the values below -
       video-player.css hardcodes them as literal rem values upstream too (no var()
       references besides the video-ratio ones above), so they're ported literally. */
    .ct-video-player__transcript-block {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }
    @media (min-width: 768px) {
      .ct-video-player__transcript-block {
        margin-top: 1.5rem;
      }
    }

    .ct-video-player__links-transcript {
      padding-right: 1rem;
    }
    @media (min-width: 768px) {
      .ct-video-player__links-transcript {
        padding-right: 1.5rem;
      }
    }

    /* Trigger label toggle: mirrors upstream's [data-collapsible-collapsed] selectors,
       keyed off this component's own Zag-driven data-state instead of upstream's vanilla-JS
       attribute (see class doc comment). */
    .ct-video-player__transcript[data-state='closed'] .ct-video-player__transcript-trigger-expand {
      display: inline;
    }
    .ct-video-player__transcript[data-state='closed'] .ct-video-player__transcript-trigger-collapse {
      display: none;
    }
    .ct-video-player__transcript-trigger-expand {
      display: none;
    }
    .ct-video-player__transcript-trigger-collapse {
      display: inline;
    }
    .ct-video-player__transcript-toggle:hover .ct-video-player__transcript-trigger-expand,
    .ct-video-player__transcript-toggle:hover .ct-video-player__transcript-trigger-collapse {
      text-decoration: underline;
    }

    .ct-video-player__transcript-panel-inner {
      padding-top: 1rem;
    }
  `;

  @property({ type: String }) theme: VideoPlayerTheme = 'light';

  /** Accessible name for the embedded iframe (native `title` attribute on `ct-iframe`). Named `frame-title`, not upstream's `title`, to avoid the global-HTML-attribute tooltip collision - see class doc comment. */
  @property({ type: String, attribute: 'frame-title' }) frameTitle?: string;

  /** Poster image URL for the `ct-video` path. */
  @property({ type: String }) poster?: string;

  /** Video source URL for the `ct-video` path. Collapses upstream's `sources` array to a single pair, mirroring `ct-video`'s own already-documented simplification. */
  @property({ type: String, attribute: 'source-url' }) sourceUrl?: string;

  /** Video source MIME type (e.g. `video/mp4`) for the `ct-video` path. */
  @property({ type: String, attribute: 'source-type' }) sourceType?: string;

  /** Width (in pixels), passed through to the composed `ct-video`/`ct-iframe`. */
  @property({ type: Number }) width?: number;

  /** Height (in pixels), passed through to the composed `ct-video`/`ct-iframe`. */
  @property({ type: Number }) height?: number;

  /** Vertical spacing position: top, bottom, both, or none. */
  @property({ type: String, attribute: 'vertical-spacing' }) verticalSpacing: VideoPlayerVerticalSpacing = 'none';

  /** Additional custom CSS classes. */
  @property({ type: String, attribute: 'modifier-class' }) modifierClass = '';

  /** Iframe URL for the embedded-video path (e.g. a YouTube embed URL). */
  @property({ type: String, attribute: 'embedded-source' }) embeddedSource?: string;

  /** Trusted, already-sanitized raw HTML of an embedded player, rendered via `unsafeHTML` when neither `source-url` nor `embedded-source` is set. Mirrors upstream's `{{ raw_source }}`. */
  @property({ type: String, attribute: 'raw-source' }) rawSource?: string;

  /** Transcript link text, rendered via `ct-link`. */
  @property({ type: String, attribute: 'transcript-text' }) transcriptText?: string;

  /**
   * Overrides the transcript link's accessible name. Not part of upstream's `transcript_link`
   * object - added because the link always renders with a leading `eye` icon (`icon-placement:
   * 'before'`), so a `transcript-url` set without `transcript-text` produces an icon-only,
   * unlabeled `ct-link` (axe `link-name`) with no way to fix it from this component's other
   * props. Mirrors the `ariaLabel` passthrough `ct-button`/`ct-link` already expose for their
   * own icon-only usage. Flagged in the porting summary.
   */
  @property({ type: String, attribute: 'transcript-aria-label' }) transcriptAriaLabel?: string;

  /** Transcript link native `title` attribute, passed through to `ct-link`. */
  @property({ type: String, attribute: 'transcript-title' }) transcriptTitle?: string;

  /** Transcript link URL. Renders no transcript link when empty. */
  @property({ type: String, attribute: 'transcript-url' }) transcriptUrl?: string;

  /** Whether the transcript link opens in a new window. */
  @property({ type: Boolean, attribute: 'transcript-new-window' }) transcriptNewWindow = false;

  /** Whether the transcript link is external. */
  @property({ type: Boolean, attribute: 'transcript-external' }) transcriptExternal = false;

  /** Trusted, already-sanitized HTML transcript content, rendered via `ct-basic-content` inside a collapsible panel. Renders no transcript disclosure when empty. */
  @property({ type: String, attribute: 'transcript-content' }) transcriptContent?: string;

  /** Text shown on the toggle when the transcript is collapsed. */
  @property({ type: String, attribute: 'transcript-expand-text' }) transcriptExpandText = 'Show transcript';

  /** Text shown on the toggle when the transcript is expanded. */
  @property({ type: String, attribute: 'transcript-collapse-text' }) transcriptCollapseText = 'Hide transcript';

  private _collapsibleService?: MachineService<any>;

  connectedCallback() {
    super.connectedCallback();

    if (!this.id) {
      this.id = `ct-video-player-${++instanceCount}`;
    }

    const props: Partial<CollapsibleProps> & { id: string; getRootNode: () => ShadowRoot | Document } = {
      id: `${this.id}-transcript`,
      getRootNode: () => this.shadowRoot ?? document,
      defaultOpen: false,
    };

    this._collapsibleService = createMachineService(machine, () => props, () => this.requestUpdate());
    this._collapsibleService.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._collapsibleService?.stop();
  }

  private renderMedia() {
    if (this.sourceUrl) {
      return html`
        <ct-video
          theme=${this.theme}
          poster=${ifDefined(this.poster)}
          src=${this.sourceUrl}
          type=${ifDefined(this.sourceType)}
          width=${ifDefined(this.width)}
          height=${ifDefined(this.height)}
          has-controls
        ></ct-video>
      `;
    }

    if (this.embeddedSource) {
      return html`
        <ct-iframe
          theme=${this.theme}
          url=${this.embeddedSource}
          width=${ifDefined(this.width)}
          height=${ifDefined(this.height)}
          title=${ifDefined(this.frameTitle)}
          allow-fullscreen
        ></ct-iframe>
      `;
    }

    return html`${unsafeHTML(this.rawSource ?? '')}`;
  }

  private renderTranscriptToggle() {
    if (!this._collapsibleService) {
      return nothing;
    }

    // `connect()` expects Zag's own internal `Service<CollapsibleSchema>` shape, which our
    // simplified MachineService doesn't structurally match, even though this connect
    // implementation only reads state/context/prop/scope (same caveat `ct-accordion`
    // documents for its own `connect()` call).
    const api = connect(this._collapsibleService as unknown as Parameters<typeof connect>[0], domNormalizer);
    const rootProps = api.getRootProps();
    const triggerProps = api.getTriggerProps();
    const contentProps = api.getContentProps();

    return html`
      <div class="ct-video-player__transcript" id=${rootProps.id} data-state=${ifDefined(rootProps['data-state'] as string | undefined)}>
        <ct-button
          theme=${this.theme}
          kind="button"
          variant="tertiary"
          class="ct-video-player__transcript-toggle"
          id=${triggerProps.id}
          aria-expanded=${ifDefined(String(triggerProps['aria-expanded']))}
          aria-controls=${ifDefined(triggerProps['aria-controls'] as string | undefined)}
          @click=${triggerProps.onClick}
        >
          <span class="ct-video-player__transcript-trigger-expand">${this.transcriptExpandText}</span>
          <span class="ct-video-player__transcript-trigger-collapse">${this.transcriptCollapseText}</span>
        </ct-button>
        <div class="ct-video-player__transcript-panel" id=${contentProps.id} ?hidden=${contentProps.hidden as boolean}>
          <div class="ct-video-player__transcript-panel-inner">
            <ct-basic-content theme=${this.theme} content=${this.transcriptContent ?? ''}></ct-basic-content>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const hasMedia = !!this.sourceUrl || !!this.embeddedSource || !!this.rawSource;

    if (!hasMedia) {
      return nothing;
    }

    const verticalSpacing = VALID_SPACING.includes(this.verticalSpacing) ? this.verticalSpacing : 'none';

    const classes = {
      'ct-video-player': true,
      [`ct-theme-${this.theme}`]: true,
      [`ct-vertical-spacing-inset--${verticalSpacing}`]: verticalSpacing !== 'none',
      [this.modifierClass]: !!this.modifierClass,
    };

    const hasTranscriptLink = !!this.transcriptUrl;
    const hasTranscriptContent = !!this.transcriptContent;

    return html`
      <div class=${classMap(classes)} data-component-name="video-player">
        <div class="ct-video-player__wrapper">${this.renderMedia()}</div>
        ${hasTranscriptLink || hasTranscriptContent
          ? html`
              <div class="ct-video-player__transcript-block">
                ${hasTranscriptLink
                  ? html`
                      <div class="ct-video-player__links">
                        <div class="ct-video-player__links-transcript">
                          <ct-link
                            theme=${this.theme}
                            label=${this.transcriptText ?? ''}
                            aria-label=${ifDefined(this.transcriptAriaLabel)}
                            title=${ifDefined(this.transcriptTitle)}
                            url=${this.transcriptUrl}
                            ?new-window=${this.transcriptNewWindow}
                            ?external=${this.transcriptExternal}
                            icon="eye"
                            icon-placement="before"
                          ></ct-link>
                        </div>
                      </div>
                    `
                  : nothing}
                ${hasTranscriptContent ? this.renderTranscriptToggle() : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-video-player': CtVideoPlayer;
  }
}
