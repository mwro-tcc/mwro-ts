import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IProductAdapter } from "./interface";
import { NewProduct, Product, products } from "../../../database/schema/products";
import { eq } from "drizzle-orm";
import { PaginationParams } from "../../../types/PaginationParams";

class ProductAdapter implements IProductAdapter {
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

    async listFromStore(storeUuid: string, params: PaginationParams): Promise<Product[]> {
        const data = await this.db
            .select()
            .from(products)
            .where(eq(products.storeUuid, storeUuid))
            .limit(params.limit)
            .offset(params.offset);
        return data;
    }
}

export function makeProductAdapter(db: NodePgDatabase) {
    return new ProductAdapter(db);
}
