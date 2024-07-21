import { z } from "zod";

export const createStoreSchema = z.object({
    body: z.object({
        communityUuid: z.string().trim().uuid().optional(),
        name: z.string().trim(),
        description: z.string().optional(),
    }),
});
