import { Request } from "express";
import { AnyZodObject, ZodError, ZodIntersection, ZodTypeAny, z } from "zod";
import { StatusError } from "../../constants/StatusError";

type AnyZodObjectOrIntersection = AnyZodObject | ZodIntersection<AnyZodObject, ZodTypeAny>;

export const validate = async <T extends AnyZodObjectOrIntersection>(
    schema: T,
    req: Request,
): Promise<z.infer<T>> => {
    try {
        return await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
    } catch (e) {
        if (e instanceof ZodError) {
            throw new StatusError(422, e.message);
        }
        throw new StatusError(500);
    }
};
