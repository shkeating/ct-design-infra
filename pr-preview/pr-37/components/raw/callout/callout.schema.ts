import { z } from 'zod';

export const CalloutSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  verticalSpacing: z
    .enum(['top', 'bottom', 'both', 'none'])
    .optional()
    .default('none')
    .describe('Vertical spacing position.'),
  heading: z
    .string()
    .optional()
    .describe('Heading text, rendered at heading level 4. Named `heading` rather than upstream CivicTheme\'s `title` to avoid colliding with the global HTML `title` attribute.'),
  content: z.string().optional().describe('Trusted HTML content, rendered via ct-paragraph.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type CalloutProps = z.infer<typeof CalloutSchema>;

export const CalloutLinkSchema = z.object({
  text: z.string().describe('Link text (rendered as the button label).'),
  url: z.string().optional().describe('Link URL.'),
  newWindow: z.boolean().optional().default(false).describe('Whether to open the link in a new window/tab.'),
  external: z.boolean().optional().default(false).describe('Whether the link is external.'),
});

export type CalloutLinkProps = z.infer<typeof CalloutLinkSchema>;
