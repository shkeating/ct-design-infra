import { z } from 'zod';

export const NavigationCardSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  title: z.string().describe('Card title text. Required for the card to render at all.'),
  summary: z.string().optional().describe('Card summary/body content, rendered via ct-paragraph.'),
  icon: z.string().optional().describe('Icon name rendered above the title.'),
  imageUrl: z.string().optional().describe('Card image URL.'),
  imageAlt: z.string().optional().describe('Card image alt text.'),
  imageAsIcon: z
    .boolean()
    .optional()
    .default(false)
    .describe('Renders the image as a small inline icon (next to the title) instead of the full card image.'),
  linkUrl: z
    .string()
    .optional()
    .describe(
      'Title link URL. When set, the title becomes a link and (unless isTitleClick is set) the whole card becomes clickable.',
    ),
  linkText: z
    .string()
    .optional()
    .describe('Link text. Accepted for schema parity with upstream CivicTheme - not rendered anywhere.'),
  linkNewWindow: z.boolean().optional().default(false).describe('Opens the title link in a new window/tab.'),
  linkExternal: z
    .boolean()
    .optional()
    .default(false)
    .describe('Marks the link as external. Accepted for schema parity with upstream CivicTheme - not rendered anywhere.'),
  isTitleClick: z
    .boolean()
    .optional()
    .default(false)
    .describe('Restricts the clickable area to just the title link instead of the whole card.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type NavigationCardProps = z.infer<typeof NavigationCardSchema>;
