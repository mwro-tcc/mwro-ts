import { z } from "zod";

export const updateCommunitySchema = z.object({
    params: z.object({ uuid: z.string() }),
    body: z.object({
        name: z.string().trim().optional(),
        isPrivate: z.boolean().optional(),
        description: z.string().optional(),
    }),
});
