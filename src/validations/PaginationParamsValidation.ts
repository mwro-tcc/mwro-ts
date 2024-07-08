import { z } from "zod";

export const paginationParamsValidation = z.object({
    query: z.object({ limit: z.number().optional(), offset: z.number().optional() }),
});
