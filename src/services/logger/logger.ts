import { getEnvValues } from "../../constants/EnvironmentVariables";

class LoggerService {
    constructor(private readonly loggingTool: any, private readonly errorLoggingTool: any) {}

    info(data: any) {
        const { NODE_ENV } = getEnvValues();
        if (NODE_ENV === "test") return;

        this.loggingTool(data);
    }
    error(data: any) {
        this.errorLoggingTool(data);
    }
}

export const logger = new LoggerService(console.log, console.error);
