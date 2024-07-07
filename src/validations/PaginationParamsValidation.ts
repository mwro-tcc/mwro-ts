import { z } from "zod";

export const paginationParamsValidation = z.object({
    params: z.object({ limit: z.number(), offset: z.number() }),
});
