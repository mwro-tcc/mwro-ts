import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IProductAdapter } from "./interface";
import { NewProduct, Product, products } from "../../../database/schema/products";
import { desc, eq, sql } from "drizzle-orm";
import { PaginationParams } from "../../../types/PaginationParams";
import { stores } from "../../../database/schema/stores";
import { communities } from "../../../database/schema/communities";

class PgProductAdapter implements IProductAdapter {
    constructor(private readonly db: NodePgDatabase) {}
    async bulkCreate(payload: NewProduct[]): Promise<void> {
        await this.db.insert(products).values(payload).returning();
    }

    async create(params: NewProduct): Promise<Product> {
        const data = await this.db.insert(products).values(params).returning();
        return data[0];
    }

    async delete(uuid: string): Promise<void> {
        await this.db.delete(products).where(eq(products.uuid, uuid));
    }

    async findByUuid(uuid: string): Promise<Product> {
        const data = await this.db.select().from(products).where(eq(products.uuid, uuid));
        return data[0];
    }

    async update(uuid: string, data: Partial<NewProduct>): Promise<Product> {
        const updated = await this.db
            .update(products)
            .set(data)
            .where(eq(products.uuid, uuid))
            .returning();
        return updated[0];
    }

    async listFromCommunity(communityUuid: string, params: PaginationParams): Promise<Product[]> {
        const data = await this.db
            .select({
                products,
            })
            .from(products)
            .innerJoin(stores, eq(stores.uuid, products.storeUuid))
            .innerJoin(communities, eq(stores.communityUuid, communities.uuid))
            .where(eq(communities.uuid, communityUuid))
            .orderBy(desc(products.createdAt))
            .limit(params.limit)
            .offset(params.offset)
            .then((results) => results.map((r) => r.products));

        return data;
    }

    async listFromStore(
        storeUuid: string,
        params: { limit: number; offset: number },
    ): Promise<Product[]> {
        return await this.db
            .select()
            .from(products)
            .where(eq(products.storeUuid, storeUuid))
            .limit(params.limit)
            .offset(params.offset);
    }
}

export function makePgProductAdapter(db: NodePgDatabase) {
    return new PgProductAdapter(db);
}
