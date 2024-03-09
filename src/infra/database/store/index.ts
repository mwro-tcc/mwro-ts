import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IStoreAdapter } from "./interface";
import { NewStore, Store, stores } from "../../../database/schema/stores";

class StoreAdapter implements IStoreAdapter {
    constructor(private readonly db: NodePgDatabase) {}

    async create(data: NewStore): Promise<Store> {
        const createdCommunity = await this.db.insert(stores).values(data).returning();
        return createdCommunity[0];
    }
}

export function makeStoreAdapter(db: NodePgDatabase) {
    return new StoreAdapter(db);
}
