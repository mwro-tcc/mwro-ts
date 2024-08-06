import { NewProduct, Product } from "../../../database/schema/products";
import { PaginationParams } from "../../../types/PaginationParams";

export interface IProductAdapter {
    bulkCreate(payload: NewProduct[]): Promise<void>;
    create(params: NewProduct): Promise<Product>;
    findByUuid(uuid: string): Promise<Product>;
    update(uuid: string, data: Partial<NewProduct>): Promise<Product>;
    delete(uuid: string): Promise<void>;
    deleteAllFromStore(storeUuid: string): Promise<void>;
    listFromCommunity(storeUuid: string, params: PaginationParams): Promise<Product[]>;
    listFromStore(storeUuid: string, params: { limit: number; offset: number }): Promise<Product[]>;
}
