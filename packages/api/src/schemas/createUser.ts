import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.email(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
