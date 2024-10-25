import { z } from "zod";

export const createReviewSchema = z.object({
    body: z.object({
        score: z.number().positive(),
        comment: z.string().optional(),
    }),
});
