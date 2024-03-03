//TODO improve implementation when needed.
// 1. Add more methods (error, warn, table...)

import { getEnvValues } from "../../constants/EnvironmentVariables";

// 2. Add winston
class Logger {
    constructor(
        private readonly loggingTool: any,
        private readonly errorLoggingTool: any,
    ) {}
    info(txt: any) {
        const { NODE_ENV } = getEnvValues();
        if (NODE_ENV === "test") return;

        this.loggingTool(txt);
    }
    error(txt: any) {
        this.errorLoggingTool(txt);
    }
}

export const logger = new Logger(console.log, console.error);
