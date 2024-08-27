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
    MONGO_PORT: z.string(),
    MONGO_HOST: z.string(),
    MONGO_DATABASE: z.string(),
    MONGO_USER: z.string(),
    MONGO_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
