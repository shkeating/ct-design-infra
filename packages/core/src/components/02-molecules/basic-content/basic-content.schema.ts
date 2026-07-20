import { z } from 'zod';

export const BasicContentSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark. Drives heading/link/table/blockquote colors.'),
  content: z
    .string()
    .describe(
      'Trusted HTML content (headings, paragraphs, lists, links, blockquotes, tables, images). Rendered as-is - callers must sanitize this HTML before passing it.',
    ),
  flush: z
    .boolean()
    .optional()
    .default(false)
    .describe('Disables the centered max-width container wrapper (upstream: is_contained=false).'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none', ''])
    .optional()
    .default('')
    .describe('Vertical spacing position: top, bottom, both, or none. Default is no extra inset padding.'),
  withBackground: z.boolean().optional().default(false).describe('Whether to display with a background.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type BasicContentProps = z.infer<typeof BasicContentSchema>;
