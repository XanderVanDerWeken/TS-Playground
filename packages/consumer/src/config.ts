import 'dotenv/config';
import { z } from 'zod';

const ConfigSchema = z.object({
  RABBITMQ_HOST: z.string(),
  RABBITMQ_PORT: z.coerce.number(),
  RABBITMQ_USERNAME: z.string(),
  RABBITMQ_PASSWORD: z.string(),
})

export const config = ConfigSchema.parse(process.env);
