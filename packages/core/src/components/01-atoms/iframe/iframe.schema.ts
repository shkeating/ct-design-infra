import { z } from 'zod';

export const IframeSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark. Only visible when `withBackground` is set.'),
  url: z.string().describe('Iframe URL. Rendered as the native `src` attribute. Renders nothing when empty.'),
  width: z.number().optional().describe('Iframe width (in pixels).'),
  height: z.number().optional().describe('Iframe height (in pixels).'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none'])
    .optional()
    .describe('Vertical spacing position: top, bottom, both, or none (default: no extra inset padding).'),
  withBackground: z.boolean().optional().default(false).describe('Whether to display with side padding + a theme-scoped background color.'),
  frameTitle: z
    .string()
    .optional()
    .describe(
      'Accessible name for the frame, rendered as the native `title` attribute. Not part of upstream CivicTheme\'s iframe schema — added per general WCAG guidance (2.4.1/4.1.2) for embedded frames, since no wcag-data/iframe.json exists to check against. Strongly recommended for every real usage.',
    ),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type IframeProps = z.infer<typeof IframeSchema>;
