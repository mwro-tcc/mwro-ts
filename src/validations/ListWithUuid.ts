import { z } from "zod";

export const listWithUuid = z.object({
    params: z.object({ uuid: z.string() }),
    query: z.object({
        limit: z.coerce.number(),
        offset: z.coerce.number(),
    }),
});
