import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import { getEnvValues } from "./constants/EnvironmentVariables";
import { logger } from "./services/logger/logger";
import { ErrorMessages, StatusError } from "./constants/StatusError";

const env = getEnvValues();
const port = env.PORT;

const app = express();

//@ts-ignore
function nextIfStripeWebhook(fn) {
    //@ts-ignore
    return (req, res, next) =>
        req.path === '/stripe/webhook' && req.method === 'POST' ? next() : fn(req, res, next);
}

app.use(express.urlencoded({ limit: '3mb', extended: false }));

app.use(nextIfStripeWebhook(express.json()));

app.use(cors());

app.use(router);

app.listen(port, async () => {
    logger.info(`mwro API listening on port ${port}`);
});

app.use((err: Error | StatusError, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err);

    if (err instanceof StatusError && err.statusCode !== 500) {
        res.status(err.statusCode).send({
            message: err.message,
        });
        return;
    }
    res.status(500).send({ message: ErrorMessages.internalServerError });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: ErrorMessages.routeNotFound });
});

process.on("SIGINT", () => {
    logger.info("Terminating mwro API...");
    process.exit();
});
