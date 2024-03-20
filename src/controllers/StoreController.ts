import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validator/validator";
import { createStoreSchema } from "../validations/CreateStore";
import { makeCreateStoreUseCase } from "../domains/store/create-store";
import { databaseConnectionPool } from "../database";

const createStore = makeCreateStoreUseCase(databaseConnectionPool);

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
}

export const storeController = new StoreController();
