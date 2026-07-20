import { z } from 'zod';

export const FieldMessageSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  content: z.string().describe('The message content.'),
  type: z
    .enum(['error', 'information', 'warning', 'success'])
    .optional()
    .default('information')
    .describe('Message type (error, information, warning, success).'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type FieldMessageProps = z.infer<typeof FieldMessageSchema>;
