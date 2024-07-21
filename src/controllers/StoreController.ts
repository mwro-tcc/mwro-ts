import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validator/validator";
import { createStoreSchema } from "../validations/CreateStore";
import { makeCreateStoreUseCase } from "../domains/store/create-store";
import { databaseConnectionPool } from "../database";
import { listWithUuidFilterValidation } from "../validations/ListWithUuidFilter";
import { makePgProductAdapter } from "../infra/database/product";
import { updateStoreSchema } from "../validations/UpdateStore";
import { makeUpdateStoreUseCase } from "../domains/store/update-store";
import { findByUuidSchema } from "../validations/FindByUuid";
import { makePgStoreAdapter } from "../infra/database/store";
import { makeDeleteStoreUseCase } from "../domains/store/delete-store";

const updateStore = makeUpdateStoreUseCase(databaseConnectionPool);
const createStore = makeCreateStoreUseCase(databaseConnectionPool);
const deleteStore = makeDeleteStoreUseCase(databaseConnectionPool);

const productAdapter = makePgProductAdapter(databaseConnectionPool);
const storeAdapter = makePgStoreAdapter(databaseConnectionPool);

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

    update() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(updateStoreSchema, req)
                .then(async (validated) => {
                    return await updateStore.execute(
                        validated.params.uuid,
                        req.user.id,
                        validated.body,
                    );
                })
                .then((response) => res.status(200).json(response))
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

    findByUuid() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    return await storeAdapter.findByUuid(validated.params.uuid);
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    delete() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    await deleteStore.execute(validated.params.uuid, req.user.id);
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }
}

export const storeController = new StoreController();
