import { z } from 'zod';

export const HeadingSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark. Drives the heading color.'),
  content: z.string().describe('Heading content (text).'),
  level: z
    .enum(['1', '2', '3', '4', '5', '6'])
    .optional()
    .default('2')
    .describe('Heading level (1-6). Determines both the rendered tag (<h1>-<h6>) and the typography scale step applied.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type HeadingProps = z.infer<typeof HeadingSchema>;
