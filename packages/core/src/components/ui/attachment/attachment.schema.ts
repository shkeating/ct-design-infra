import { z } from 'zod';

export const AttachmentSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  title: z.string().optional().describe('Attachment title.'),
  content: z.string().optional().describe('Attachment content.'),
  withBackground: z.boolean().optional().default(false).describe('Whether to display with a background.'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none'])
    .optional()
    .default('none')
    .describe('Vertical spacing position.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type AttachmentProps = z.infer<typeof AttachmentSchema>;

export const AttachmentFileSchema = z.object({
  name: z.string().describe('File name (as it appears to the user).'),
  ext: z.string().optional().describe('File extension.'),
  url: z.string().optional().describe('File URL.'),
  size: z.string().optional().describe('File size (as it appears to the user).'),
  created: z.string().optional().describe('File created date.'),
  changed: z.string().optional().describe('File modified date.'),
  icon: z.string().optional().describe('File type icon name. Defaults to "download-file" when unset.'),
});

export type AttachmentFileProps = z.infer<typeof AttachmentFileSchema>;
