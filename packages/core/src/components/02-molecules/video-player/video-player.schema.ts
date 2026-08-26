import { z } from 'zod';

export const VideoPlayerSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  frameTitle: z
    .string()
    .optional()
    .describe(
      "Accessible name for the embedded iframe (native `title` attribute on ct-iframe). Named `frameTitle`, not upstream's `title`, to avoid the global-HTML-attribute tooltip collision.",
    ),
  poster: z.string().optional().describe('Poster image URL for the ct-video (source) path.'),
  sourceUrl: z
    .string()
    .optional()
    .describe("Video source URL for the ct-video path. Collapses upstream's `sources` array to a single pair, mirroring ct-video's own simplification."),
  sourceType: z.string().optional().describe('Video source MIME type (e.g. `video/mp4`) for the ct-video path.'),
  width: z.number().optional().describe('Width (in pixels), passed through to the composed ct-video/ct-iframe.'),
  height: z.number().optional().describe('Height (in pixels), passed through to the composed ct-video/ct-iframe.'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none'])
    .optional()
    .default('none')
    .describe('Vertical spacing position: top, bottom, both, or none.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
  embeddedSource: z.string().optional().describe('Iframe URL for the embedded-video path (e.g. a YouTube embed URL).'),
  rawSource: z
    .string()
    .optional()
    .describe('Trusted, already-sanitized raw HTML of an embedded player, rendered when neither sourceUrl nor embeddedSource is set. Callers must not pass unsanitized input.'),
  transcriptText: z.string().optional().describe('Transcript link text.'),
  transcriptAriaLabel: z
    .string()
    .optional()
    .describe(
      'Overrides the transcript link accessible name. Required when transcriptUrl is set without transcriptText (icon-only transcript link).',
    ),
  transcriptTitle: z.string().optional().describe('Transcript link native `title` attribute.'),
  transcriptUrl: z.string().optional().describe('Transcript link URL. No transcript link renders when empty.'),
  transcriptNewWindow: z.boolean().optional().default(false).describe('Whether the transcript link opens in a new window.'),
  transcriptExternal: z.boolean().optional().default(false).describe('Whether the transcript link is external.'),
  transcriptContent: z
    .string()
    .optional()
    .describe('Trusted, already-sanitized HTML transcript content, rendered inside a collapsible panel. No transcript disclosure renders when empty.'),
  transcriptExpandText: z.string().optional().default('Show transcript').describe('Text shown on the toggle when the transcript is collapsed.'),
  transcriptCollapseText: z.string().optional().default('Hide transcript').describe('Text shown on the toggle when the transcript is expanded.'),
});

export type VideoPlayerProps = z.infer<typeof VideoPlayerSchema>;
