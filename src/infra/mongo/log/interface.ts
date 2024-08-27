export interface ILogAdapter {
    write(data: any): Promise<void>;
}
