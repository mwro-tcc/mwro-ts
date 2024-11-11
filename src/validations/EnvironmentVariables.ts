import { z } from "zod";

export const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.string(),
    SECRET: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_NAME: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_PUBLISHABLE_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET_KEY: z.string()
});

export type Env = z.infer<typeof envSchema>;
