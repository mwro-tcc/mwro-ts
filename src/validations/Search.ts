import { z } from "zod";

export const PaginatedSearchValidation = z.object({
    query: z.object({
        term: z.string().min(1),
        limit: z.number().optional(),
        offset: z.number().optional(),
    }),
});
