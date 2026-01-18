import { z } from 'zod';

export const UserCreatedSchema = z.object({
  id: z.uuid(),
  type: z.literal('user.created'),
  timestamp: z.string(),
  payload: z.object({
    user: z.object({
      id: z.int(),
      email: z.email(),
    }),
  }),
});
