import { z } from "zod";

export const signUpSchema = z.object({
    body: z.object({
        name: z.string().trim(),
        email: z.string().trim().email(),
        password: z.string().min(8),
    }),
});
