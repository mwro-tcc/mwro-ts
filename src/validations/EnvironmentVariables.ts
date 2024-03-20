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
    DEFAULT_STORE_UUID: z.string(), // Temporary fix, while we do not implement store creation.
});

export type Env = z.infer<typeof envSchema>;
