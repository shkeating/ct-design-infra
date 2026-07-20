import { z } from 'zod';

export const ButtonSchema = z.object({
  theme: z.enum(['light', 'dark']).optional().default('light').describe('Theme variation: light or dark.'),
  kind: z.enum(['button', 'link', 'reset', 'submit']).optional().default('button').describe('HTML element type.'),
  variant: z.enum(['primary', 'secondary', 'tertiary']).optional().default('primary').describe('Visual style variant.'),
  size: z.enum(['large', 'regular', 'small']).optional().default('regular').describe('Size variation.'),
  label: z.string().describe('The primary text content or label.'),
  url: z.string().optional().describe('The destination URL (used when kind is link).'),
  icon: z.string().optional().describe('Name of the icon to display.'),
  iconPlacement: z.enum(['before', 'after']).optional().default('after').describe('Position of the icon.'),
  disabled: z.boolean().optional().default(false).describe('Disables the button.'),
  newWindow: z.boolean().optional().default(false).describe('If true, adds target="_blank" to links.'),
  external: z.boolean().optional().default(false).describe('Indicates if the link is external.'),
  dismissable: z.boolean().optional().default(false).describe('Adds dismiss functionality styling.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;