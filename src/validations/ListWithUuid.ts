import { z } from "zod";
import { paginationParamsValidation } from "./PaginationParamsValidation";

export const listWithUuid = paginationParamsValidation.and(
    z.object({
        params: z.object({ uuid: z.string() }),
    }),
);
