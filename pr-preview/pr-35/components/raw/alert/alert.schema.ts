import { z } from 'zod';

export const AlertSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  type: z
    .enum(['information', 'warning', 'error', 'success'])
    .optional()
    .default('information')
    .describe('Alert type, determines color and icon.'),
  heading: z.string().optional().describe('Alert title, rendered next to the type icon.'),
  description: z.string().optional().describe('Alert body copy.'),
  identifier: z
    .string()
    .optional()
    .describe('Unique identifier, used for data-alert-id and the dismiss event detail.'),
  noDismiss: z
    .boolean()
    .optional()
    .default(false)
    .describe('Opt out of the dismiss ("x") control (shown by default).'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type AlertProps = z.infer<typeof AlertSchema>;
