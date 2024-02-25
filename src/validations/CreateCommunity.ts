import { z } from "zod";

export const createCommunitySchema = z.object({
    body: z.object({
        name: z.string().trim(),
        latitude: z.number(),
        longitude: z.number(),
        isPrivate: z.boolean(),
        description: z.string().trim().optional(),
    }),
});
