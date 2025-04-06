import { z } from "zod";

export const kickStoreSchema = z.object({
    body: z.object({
        storeUuid: z.string().trim(),
    }),
    params: z.object({ uuid: z.string() }),
});
