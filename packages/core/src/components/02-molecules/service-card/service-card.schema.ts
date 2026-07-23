import { z } from 'zod';

export const ServiceCardSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark. Drives the card background and stripe color.'),
  title: z
    .string()
    .describe(
      'Card title text, rendered as an <h4> via ct-heading. Required — the card renders nothing without it, mirroring upstream CivicTheme.',
    ),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type ServiceCardProps = z.infer<typeof ServiceCardSchema>;
