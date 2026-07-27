import { z } from 'zod';

export const ItemListSchema = z.object({
  direction: z.enum(['horizontal', 'vertical']).optional().default('horizontal').describe('List direction.'),
  size: z.enum(['large', 'regular', 'small']).optional().default('regular').describe('List size — controls the gap between items.'),
  noGap: z.boolean().optional().default(false).describe('Whether to render without gaps between items.'),
  modifierClass: z.string().optional().describe('Additional custom CSS classes.'),
});

export type ItemListProps = z.infer<typeof ItemListSchema>;

export const ItemListItemSchema = z.object({});

export type ItemListItemProps = z.infer<typeof ItemListItemSchema>;
