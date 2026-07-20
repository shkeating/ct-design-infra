import { z } from 'zod';

export const BreadcrumbSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  activeIsLink: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether the final (current-page) crumb is rendered as a clickable link instead of plain text.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type BreadcrumbProps = z.infer<typeof BreadcrumbSchema>;

export const BreadcrumbItemSchema = z.object({
  text: z.string().describe('The crumb link text.'),
  url: z.string().optional().describe('The crumb link URL. Omit for the current page when `activeIsLink` is false.'),
});

export type BreadcrumbItemProps = z.infer<typeof BreadcrumbItemSchema>;
