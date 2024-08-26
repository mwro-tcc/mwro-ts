import { getEnvValues } from "../../constants/EnvironmentVariables";
import { makeLogAdapter } from "../../infra/mongo/log";
import { ILogAdapter } from "../../infra/mongo/log/interface";

class LoggerService {
    constructor(
        private readonly loggingTool: any,
        private readonly errorLoggingTool: any,
        private readonly adapter: ILogAdapter,
    ) {}

    info(data: any) {
        const { NODE_ENV } = getEnvValues();
        if (NODE_ENV === "test") return;

        this.loggingTool(data);
        this.adapter.write(data);
    }
    error(data: any) {
        this.errorLoggingTool(data);
        this.adapter.write(data);
    }
}

export const logger = new LoggerService(console.log, console.error, makeLogAdapter());
