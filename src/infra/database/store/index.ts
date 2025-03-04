import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IStoreAdapter } from "./interface";
import { NewStore, Store, stores } from "../../../database/schema/stores";
import { and, desc, eq, getOrderByOperators, like } from "drizzle-orm";
import { favorites } from "../../../database/schema/favorites";

class PgStoreAdapter implements IStoreAdapter {
    constructor(private readonly db: NodePgDatabase) { }

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

    async listCreatedStores(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<Store[]> {
        return await this.db
            .select()
            .from(stores)
            .where(eq(stores.userUuid, userUuid))
            .orderBy(desc(stores.createdAt))
            .limit(params.limit)
            .offset(params.offset);
    }

    async listFavoriteStores(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<Store[]> {
        return await this.db
            .select({
                store: stores
            })
            .from(stores)
            .innerJoin(favorites, eq(stores.uuid, favorites.assetUuid))
            .where(
                and(
                    eq(stores.userUuid, userUuid),
                    eq(favorites.userUuid, userUuid)
                ))
            .orderBy(desc(stores.createdAt))
            .limit(params.limit)
            .offset(params.offset).then(data => data.map(d => d.store));
    }
    async update(uuid: string, data: Partial<NewStore>): Promise<Store> {
        const updated = await this.db
            .update(stores)
            .set(data)
            .where(eq(stores.uuid, uuid))
            .returning();
        return updated[0];
    }

    async delete(uuid: string): Promise<void> {
        await this.db.delete(stores).where(eq(stores.uuid, uuid));
    }

    async searchByName(
        name: string,
        params: { limit: number; offset: number },
    ): Promise<Store[]> {
        const lastChar = name[name.length - 1];
        if (lastChar !== "%") {
            name = name + "%";
        }

        return await this.db
            .select()
            .from(stores)
            .where(like(stores.name, name))
            .limit(params.limit)
            .offset(params.offset);
    }

    async unnassociateFromCommunity(communityUuid: string): Promise<void> {
        await this.db
            .update(stores)
            .set({ communityUuid: null })
            .where(eq(stores.communityUuid, communityUuid))
    }
}

export function makePgStoreAdapter(db: NodePgDatabase) {
    return new PgStoreAdapter(db);
}
