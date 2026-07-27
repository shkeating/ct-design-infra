import { z } from 'zod';

export const LabelSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  tag: z.enum(['label', 'legend']).optional().default('label').describe('HTML tag to render: label or legend.'),
  content: z.string().describe("The label's text content."),
  size: z
    .enum(['extra-large', 'large', 'regular', 'small', 'extra-small'])
    .optional()
    .default('regular')
    .describe('Label size.'),
  required: z.boolean().optional().default(false).describe('Whether the label marks its associated field as required.'),
  requiredText: z.string().optional().default('(required)').describe('Text shown when required is set.'),
  for: z.string().optional().describe('ID of the form element this label belongs to (maps to the for attribute when tag is "label").'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type LabelProps = z.infer<typeof LabelSchema>;
