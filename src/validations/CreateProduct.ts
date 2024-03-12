import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().trim(),
        storeUuid: z.string().trim(),
        price: z.number().positive(),
        stock: z.number().positive(),
        description: z.string().optional(),
    }),
});
