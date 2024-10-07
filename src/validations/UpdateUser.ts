import { z } from "zod";

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().trim().optional(),
        phoneNumber: z.string().length(14).optional(),
    }),
});
