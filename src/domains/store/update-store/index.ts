import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NewStore, Store } from "../../../database/schema/stores";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { databaseConnectionPool } from "../../../database";
import { IUpdateStoreUseCase as IUPdateStoreUseCase } from "./interface";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";

class UpdateStoreUseCase implements IUPdateStoreUseCase {
    constructor(private readonly storeAdapter: IStoreAdapter) {}

    async execute(
        storeUuid: string,
        userUuidMakingRequest: string,
        params: Partial<NewStore>,
    ): Promise<Store> {
        const currentStore = await this.storeAdapter.findByUuid(storeUuid);
        if (currentStore.userUuid !== userUuidMakingRequest)
            throw new StatusError(400, ErrorMessages.userIsNotStoreOwner);

        const createdStore = await this.storeAdapter.update(storeUuid, params);
        return createdStore;
    }
}

export function makeUpdateStoreUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new UpdateStoreUseCase(makePgStoreAdapter(db));
}
