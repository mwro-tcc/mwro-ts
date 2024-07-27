import { z } from "zod";

export const updateStoreSchema = z.object({
    params: z.object({ uuid: z.string().uuid() }),
    body: z.object({
        communityUuid: z.string().trim().uuid().nullable().optional(),
        name: z.string().trim().optional(),
        description: z.string().optional(),
    }),
});
