import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { getEnvValues } from "./constants/EnvironmentVariables";
import { logger } from "./services/logger/logger";
import { ErrorMessages, StatusError } from "./constants/StatusError";

const env = getEnvValues();
const port = env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.listen(port, async () => {
    logger.info(`mwro API listening on port ${port}`);
});

app.use((err: Error | StatusError, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err);

    if (err instanceof StatusError && err.statusCode !== 500) {
        res.status(err.statusCode).send(err.message);
        return;
    }
    res.status(500).send(ErrorMessages.internalServerError);
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new StatusError(404, ErrorMessages.routeNotFound));
});

process.on("SIGINT", () => {
    logger.info("Terminating mwro API...");
    process.exit();
});
