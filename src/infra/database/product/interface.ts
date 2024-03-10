import { NewProduct, Product } from "../../../database/schema/products";

export interface IProductAdapter {
    bulkCreate(payload: NewProduct[]): Promise<void>;
    create(params: NewProduct): Promise<Product>;
    findByUuid(uuid: string): Promise<Product>;
    update(uuid: string, data: Partial<NewProduct>): Promise<Product>;
    delete(uuid: string): Promise<void>;
    listCreatedByUserUuid(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<any>;
}