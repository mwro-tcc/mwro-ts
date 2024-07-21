import { string, z } from "zod";
import { paginationParamsValidation } from "./PaginationParamsValidation";

export const listWithUuidFilterValidation = paginationParamsValidation.and(
    z.object({
        params: z.object({ uuid: string() }),
    }),
);
