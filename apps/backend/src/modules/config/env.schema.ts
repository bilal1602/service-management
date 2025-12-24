import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'dev', 'production', 'prod', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(8080),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
});

export type EnvConfig = z.infer<typeof envSchema>;
