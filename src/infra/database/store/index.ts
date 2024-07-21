import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IStoreAdapter } from "./interface";
import { NewStore, Store, stores } from "../../../database/schema/stores";
import { desc, eq, getOrderByOperators } from "drizzle-orm";

class PgStoreAdapter implements IStoreAdapter {
    constructor(private readonly db: NodePgDatabase) {}

    async create(data: NewStore): Promise<Store> {
        const createdCommunity = await this.db.insert(stores).values(data).returning();
        return createdCommunity[0];
    }

    async bulkCreate(payload: NewStore[]): Promise<void> {
        await this.db.insert(stores).values(payload).returning();
    }

    async findByUuid(uuid: string): Promise<Store> {
        const data = await this.db.select().from(stores).where(eq(stores.uuid, uuid));
        return data[0];
    }

    async listFromCommunity(communityUuid: string, params: { limit: number; offset: number }) {
        return await this.db
            .select()
            .from(stores)
            .where(eq(stores.communityUuid, communityUuid))
            .orderBy(desc(stores.createdAt))
            .limit(params.limit)
            .offset(params.offset);
    }

    async update(uuid: string, data: Partial<NewStore>): Promise<Store> {
        const updated = await this.db
            .update(stores)
            .set(data)
            .where(eq(stores.uuid, uuid))
            .returning();
        return updated[0];
    }
}

export function makePgStoreAdapter(db: NodePgDatabase) {
    return new PgStoreAdapter(db);
}
