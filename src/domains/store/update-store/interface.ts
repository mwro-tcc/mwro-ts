import { NewStore, Store } from "../../../database/schema/stores";

export interface IUpdateStoreUseCase {
    execute(
        storeUuid: string,
        userUuidMakingRequest: string,
        params: Partial<NewStore>,
    ): Promise<Store>;
}
