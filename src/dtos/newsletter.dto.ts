import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.email('E-mail inválido').max(160),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
