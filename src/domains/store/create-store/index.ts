import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NewStore, Store } from "../../../database/schema/stores";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { databaseConnectionPool } from "../../../database";
import { ICreateStoreUseCase } from "./interface";

class CreateStoreUseCase implements ICreateStoreUseCase {
    constructor(private readonly storeAdapter: IStoreAdapter) {}

    async execute(params: NewStore): Promise<Store> {
        const createdStore = await this.storeAdapter.create(params);
        return createdStore;
    }
}

export function makeCreateStoreUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new CreateStoreUseCase(makePgStoreAdapter(db));
}
