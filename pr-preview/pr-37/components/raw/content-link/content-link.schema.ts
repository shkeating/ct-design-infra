import { z } from 'zod';

export const ContentLinkSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  text: z.string().optional().describe('The link text content.'),
  url: z.string().optional().describe('The destination URL.'),
  linkTitle: z.string().optional().describe('Title attribute for the link (rendered as the HTML title attribute).'),
  newWindow: z.boolean().optional().default(false).describe('If true, opens the link in a new window/tab.'),
  external: z
    .boolean()
    .optional()
    .default(false)
    .describe('Indicates if the link is external; renders a trailing "upper-right-arrow" icon.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type ContentLinkProps = z.infer<typeof ContentLinkSchema>;
