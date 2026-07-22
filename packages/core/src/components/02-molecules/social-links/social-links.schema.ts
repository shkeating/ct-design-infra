import { z } from 'zod';

export const SocialLinksSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  withBorder: z.boolean().optional().default(false).describe('Whether icons have a circular border around them.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type SocialLinksProps = z.infer<typeof SocialLinksSchema>;

export const SocialLinksItemSchema = z.object({
  icon: z.string().optional().describe('Icon identifier (see ct-icon for the available set), e.g. "facebook".'),
  url: z.string().describe('Destination URL for the link.'),
  linkTitle: z
    .string()
    .optional()
    .describe(
      'Accessible name / tooltip for this link (e.g. "Facebook"). The rendered button is icon-only with no ' +
        'visible text of its own, so omitting this leaves the link without an accessible name.',
    ),
});

export type SocialLinksItemProps = z.infer<typeof SocialLinksItemSchema>;
