import { Request } from "express";
import { AnyZodObject, ZodError, z } from "zod";
import { StatusError } from "../../constants/StatusError";

export const validate = async <T extends AnyZodObject>(
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
