import { Product } from "../../../database/schema/products";
import { CreateProductUseCaseParams } from "./types";

export interface ICreateProductUseCase {
    execute(payload: CreateProductUseCaseParams): Promise<Product>;
}
