export interface IDeleteStoreUseCase {
    execute(storeUuid: string, userUuidMakingRequest: string): Promise<void>;
}
