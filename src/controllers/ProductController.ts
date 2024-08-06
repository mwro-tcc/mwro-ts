import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validator/validator";
import { findByUuidSchema } from "../validations/FindByUuid";
import { makePgProductAdapter } from "../infra/database/product";
import { databaseConnectionPool } from "../database";
import { makeCreateProductUseCase } from "../domains/product/create-product";
import { makeDeleteProductUseCase } from "../domains/product/delete-product";
import { createProductSchema } from "../validations/CreateProduct";
import { updateProductSchema } from "../validations/UpdateProduct";
import { makeUpdateProductUseCase } from "../domains/product/update-product";
import { PaginatedSearchValidation } from "../validations/Search";

const productAdapter = makePgProductAdapter(databaseConnectionPool);
const createProduct = makeCreateProductUseCase(databaseConnectionPool);
const deleteProduct = makeDeleteProductUseCase(databaseConnectionPool);
const updateProduct = makeUpdateProductUseCase(databaseConnectionPool);

class ProductController {
    create() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(createProductSchema, req)
                .then(async (validated) => {
                    return await createProduct.execute({
                        product: validated.body,
                        userUuidRequestingCreation: req.user.id,
                    });
                })
                .then((data) => res.status(201).send(data))
                .catch(next);
        };
    }

    update() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(updateProductSchema, req)
                .then(async (validated) => {
                    return await updateProduct.execute(
                        req.user.id,
                        validated.params.uuid,
                        validated.body,
                    );
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    delete() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    return await deleteProduct.execute(req.user.id, validated.params.uuid);
                })
                .then(() => res.status(204).send())
                .catch(next);
        };
    }

    findByUuid() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    return await productAdapter.findByUuid(validated.params.uuid);
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    search() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(PaginatedSearchValidation, req)
                .then(async (validated) => {
                    return await productAdapter.searchByName(validated.query.term, {
                        limit: validated.query.limit || 10,
                        offset: validated.query.offset || 0,
                    });
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }
}

export const productController = new ProductController();
