import { Request, NextFunction, Response } from "express";
import { logger } from "../../services/logger/logger";

export function loggingMiddleware() {
    return function(req: Request, _: Response, next: NextFunction) {
        try {
            logger.info({
                info: "Received request:",
                method: req.method,
                url: req.originalUrl,
            });
        } catch (e) {
            console.log("internal logger error:", e);
        }
        next();
    };
}
