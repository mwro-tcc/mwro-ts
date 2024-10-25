import { z } from "zod";

export const createReviewSchema = z.object({
    body: z.object({
        score: z.number().gte(0).lte(5),
        comment: z.string().optional(),
    }),
});
