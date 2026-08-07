import { z } from 'zod';

export const TableOfContentsSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  heading: z.string().optional().describe('Heading text shown above the links (e.g. "On this page").'),
  position: z
    .enum(['before', 'after', 'prepend', 'append'])
    .optional()
    .default('before')
    .describe("Where this component sits relative to the content it's a table of contents for; controls spacing (margin) only."),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type TableOfContentsProps = z.infer<typeof TableOfContentsSchema>;

export const TableOfContentsItemSchema = z.object({
  text: z.string().describe('The link text (should clearly identify the target section).'),
  url: z.string().describe('The link target, typically an in-page anchor such as "#section-heading".'),
});

export type TableOfContentsItemProps = z.infer<typeof TableOfContentsItemSchema>;
