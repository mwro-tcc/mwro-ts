import { z } from "zod";

export const updateCommunitySchema = z.object({
    params: z.object({ uuid: z.string().uuid() }),
    body: z.object({
        name: z.string().trim().optional(),
        isPrivate: z.boolean().optional(),
        description: z.string().trim().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
    }),
});
