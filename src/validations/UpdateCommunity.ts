import { z } from "zod";

export const updateCommunitySchema = z.object({
    body: z.object({
        community: z.object({
            name: z.string().trim().optional(),
            isPrivate: z.boolean().optional(),
            description: z.string().optional(),
        }),
        communityUuid: z.string(),
    }),
});
