import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IProductAdapter } from "./interface";
import { NewProduct, Product, products } from "../../../database/schema/products";
import { eq } from "drizzle-orm";

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

    async listCreatedByUserUuid(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<any> {
        throw new Error("");
    }

    async update(
        uuid: string,
        data: Partial<{
            name: string;
            price: number;
            stock: number;
            storeUuid: string;
            uuid?: string | undefined;
            description?: string | null | undefined;
            createdAt?: string | undefined;
        }>,
    ): Promise<{
        uuid: string;
        name: string;
        price: number;
        stock: number;
        description: string | null;
        storeUuid: string;
        createdAt: string;
    }> {
        throw new Error("");
    }
}

export function makeProductAdapter(db: NodePgDatabase) {
    return new ProductAdapter(db);
}