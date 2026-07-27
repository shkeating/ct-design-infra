import { z } from 'zod';

export const FieldsetSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  legend: z.string().optional().describe('Legend text for the fieldset. Nothing is rendered when this is empty.'),
  description: z
    .string()
    .optional()
    .describe(
      'Trusted HTML description for the fieldset, rendered via ct-paragraph. Callers must sanitize this HTML before passing it.',
    ),
  descriptionDisplay: z
    .enum(['before', 'after', 'invisible'])
    .optional()
    .default('before')
    .describe('Description position: before the fields, after them, or visually hidden.'),
  message: z.string().optional().describe('Validation/status message content, rendered via ct-field-message.'),
  messageType: z
    .enum(['error', 'information', 'warning', 'success'])
    .optional()
    .default('error')
    .describe('Message type: error, information, warning, or success.'),
  required: z.boolean().optional().default(false).describe('Whether the fieldset (and its legend) is marked as required.'),
  requiredText: z.string().optional().describe('Text shown within the legend when required is set.'),
  prefix: z
    .string()
    .optional()
    .describe('Trusted HTML rendered before the grouped fields. Callers must sanitize this HTML before passing it.'),
  suffix: z
    .string()
    .optional()
    .describe('Trusted HTML rendered after the grouped fields. Callers must sanitize this HTML before passing it.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type FieldsetProps = z.infer<typeof FieldsetSchema>;
