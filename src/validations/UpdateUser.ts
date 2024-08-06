import { z } from "zod";

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().trim().optional(),
    }),
});
