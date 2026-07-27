import { z } from 'zod';
import { ICON_NAMES } from './icon-registry.js';

export const IconSchema = z.object({
  name: z.enum(ICON_NAMES).describe('Name of the icon to render.'),
  size: z
    .enum(['extra-small', 'small', 'regular', 'large', 'extra-large'])
    .optional()
    .describe('Named size. Omit to inherit a 1em box sized by the surrounding font-size.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type IconProps = z.infer<typeof IconSchema>;
