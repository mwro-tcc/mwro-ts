export interface IDeleteAccount {
    execute(userId: string): Promise<void>;
}
