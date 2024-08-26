export interface ILogAdapter {
    write(data: unknown): Promise<void>;
}
