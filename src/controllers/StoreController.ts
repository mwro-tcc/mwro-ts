import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validator/validator";
import { createStoreSchema } from "../validations/CreateStore";
import { makeCreateStoreUseCase } from "../domains/store/create-store";
import { databaseConnectionPool } from "../database";
import { listWithUuidFilterValidation } from "../validations/ListWithUuidFilter";
import { makePgProductAdapter } from "../infra/database/product";

const createStore = makeCreateStoreUseCase(databaseConnectionPool);
const productAdapter = makePgProductAdapter(databaseConnectionPool);

class StoreController {
    create() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(createStoreSchema, req)
                .then(async (validated) => {
                    return await createStore.execute({
                        ...validated.body,
                        userUuid: req.user.id,
                    });
                })
                .then((response) => res.status(201).json(response))
                .catch(next);
        };
    }

    listProducts() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(listWithUuidFilterValidation, req)
                .then(async (validated) => {
                    const limit = Number(validated.query.limit) || 10;
                    const offset = Number(validated.query.offset) || 0;

                    return await productAdapter.listFromStore(validated.params.uuid, {
                        limit,
                        offset,
                    });
                })
                .then((response) => res.status(201).json(response))
                .catch(next);
        };
    }
}

export const storeController = new StoreController();
