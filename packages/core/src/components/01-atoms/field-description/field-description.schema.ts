import { z } from 'zod';

export const FieldDescriptionSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  size: z.enum(['large', 'regular']).optional().default('regular').describe('Description size: large or regular.'),
  content: z.string().describe("The description's text content."),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type FieldDescriptionProps = z.infer<typeof FieldDescriptionSchema>;
