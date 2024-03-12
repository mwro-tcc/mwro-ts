import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validator/validator";
import { findByUuidSchema } from "../validations/FindByUuid";
import { makeProductAdapter } from "../infra/database/product";
import { databaseConnectionPool } from "../database";
import { makeCreateProductUseCase } from "../domains/product/create-product";
import { makeDeleteProductUseCase } from "../domains/product/delete-product";
import { createProductSchema } from "../validations/CreateProduct";

const productAdapter = makeProductAdapter(databaseConnectionPool);
const createProduct = makeCreateProductUseCase(databaseConnectionPool);
const deleteProduct = makeDeleteProductUseCase(databaseConnectionPool);

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
    //   update() {
    //       return async (req: Request, res: Response, next: NextFunction) => {
    //           return await validate(updateCommunitySchema, req)
    //               .then(async (validated) => {
    //                   return await updateCommunity.execute(
    //                       req.user.id,
    //                       validated.params.uuid,
    //                       validated.body,
    //                   );
    //               })
    //               .then((data) => res.status(200).send(data))
    //               .catch(next);
    //       };
    //   }
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
}

export const productController = new ProductController();
