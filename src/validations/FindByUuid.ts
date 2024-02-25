import { z } from "zod";

export const findByUuidSchema = z.object({
    params: z.object({ uuid: z.string() }),
});
