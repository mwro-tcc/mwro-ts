import { z } from "zod";

export const updateProductSchema = z.object({
    params: z.object({ uuid: z.string().uuid() }),
    body: z.object({
        name: z.string().trim().optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
        description: z.string().optional(),
    }),
});
