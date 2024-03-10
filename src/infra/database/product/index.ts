import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IProductAdapter } from "./interface";
import { NewProduct, Product } from "../../../database/schema/products";

class ProductAdapter implements IProductAdapter{
    constructor(
        private readonly db: NodePgDatabase
    ){}
    async bulkCreate(payload:NewProduct[]): Promise<void> {
        throw new Error('')
    }

    async create(params: NewProduct): Promise<Product> {
        throw new Error('')
    }

    async delete(uuid: string): Promise<void> {
        throw new Error('')
    }

    async findByUuid(uuid: string): Promise<Product> {
        throw new Error('')
    }

    async listCreatedByUserUuid(userUuid: string, params: { limit: number; offset: number; }): Promise<any> {
        throw new Error('')
    }
    
    async update(uuid: string, data: Partial<{ name: string; price: number; stock: number; storeUuid: string; uuid?: string | undefined; description?: string | null | undefined; createdAt?: string | undefined; }>): Promise<{ uuid: string; name: string; price: number; stock: number; description: string | null; storeUuid: string; createdAt: string; }> {
        throw new Error('')
    }
}

export function makeProductAdapter(db: NodePgDatabase){
    return new ProductAdapter(db)
}