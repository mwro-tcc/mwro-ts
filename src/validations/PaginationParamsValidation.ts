import { z } from "zod";

export const paginationParamsValidation = z.object({
    query: z.object({
        limit: z.coerce.number().min(1).optional(),
        offset: z.coerce.number().optional(),
    }),
});
