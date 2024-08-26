import { ILogAdapter } from "./interface";

class LogAdapter implements ILogAdapter {
    constructor() {}
    async write(data: unknown): Promise<void> {}
}

export function makeLogAdapter() {
    return new LogAdapter();
}
