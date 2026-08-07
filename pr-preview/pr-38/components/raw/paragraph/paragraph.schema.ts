import { z } from 'zod';

export const ParagraphSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark. Drives heading/link/table/blockquote colors.'),
  content: z
    .string()
    .describe(
      'Trusted HTML content (paragraphs, headings, links, lists, blockquotes, tables, images). Rendered as-is - callers must sanitize this HTML before passing it.',
    ),
  size: z
    .enum(['extra-large', 'large', 'regular', 'small'])
    .optional()
    .default('regular')
    .describe('Paragraph size: extra-large, large, regular, or small.'),
  noMargin: z.boolean().optional().default(false).describe('Disables the default bottom margin (upstream: no_margin).'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type ParagraphProps = z.infer<typeof ParagraphSchema>;
