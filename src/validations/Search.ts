import { z } from "zod";

export const PaginatedSearchValidation = z.object({
    query: z.object({
        term: z.string().min(1),
        limit: z.coerce.number().min(1).optional(),
        offset: z.coerce.number().optional(),
    }),
});
