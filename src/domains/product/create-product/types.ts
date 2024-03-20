import { NewProduct } from "../../../database/schema/products";

export type CreateProductUseCaseParams = {
    userUuidRequestingCreation: string;
    product: NewProduct;
};
