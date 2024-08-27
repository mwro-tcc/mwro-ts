import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { getEnvValues } from "./constants/EnvironmentVariables";
import { logger } from "./services/logger/logger";
import { ErrorMessages, StatusError } from "./constants/StatusError";
import { connectToMongo } from "./mongo";

const env = getEnvValues();
const port = env.PORT;

connectToMongo();

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
