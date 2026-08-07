import { z } from 'zod';

export const PublicationCardSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  title: z.string().optional().describe('Card title text.'),
  summary: z
    .string()
    .optional()
    .describe(
      'Trusted HTML summary content, rendered via ct-paragraph. Callers must sanitize this HTML before passing it.',
    ),
  imageUrl: z.string().optional().describe('Thumbnail image URL.'),
  imageAlt: z.string().optional().default('').describe('Thumbnail image alt text.'),
  fileName: z.string().optional().describe('Downloadable file name.'),
  fileUrl: z.string().optional().describe('Downloadable file URL.'),
  fileExt: z.string().optional().describe('Downloadable file extension (e.g. "pdf").'),
  fileSize: z.string().optional().describe('Downloadable file size (e.g. "42.88 KB").'),
  isTitleClick: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to make only the title clickable instead of the whole card.'),
  filenamePrefix: z
    .string()
    .optional()
    .default('File details:')
    .describe('Description of file details for accessibility.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type PublicationCardProps = z.infer<typeof PublicationCardSchema>;
