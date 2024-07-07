import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validator/validator";
import { createCommunitySchema } from "../validations/CreateCommunity";
import { makeCreateCommunityUseCase } from "../domains/community/create-community";
import { makeUpdateCommunityUseCase } from "../domains/community/update-community";
import { updateCommunitySchema } from "../validations/UpdateCommunity";
import { findByUuidSchema } from "../validations/FindByUuid";
import { makeDeleteCommunityUseCase } from "../domains/community/delete-community";
import { makePgCommunityAdapter } from "../infra/database/community";
import { listWithUuid } from "../validations/ListWithUuid";
import { makePgProductAdapter } from "../infra/database/product";
import { databaseConnectionPool } from "../database";

const communityAdapter = makePgCommunityAdapter();
const createCommunity = makeCreateCommunityUseCase();
const updateCommunity = makeUpdateCommunityUseCase();
const deleteCommunity = makeDeleteCommunityUseCase();

const productAdapter = makePgProductAdapter(databaseConnectionPool);

class CommunityController {
    create() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(createCommunitySchema, req)
                .then(async (validated) => {
                    return await createCommunity.execute({
                        communityData: validated.body,
                        creatorUserUuid: req.user.id,
                    });
                })
                .then((data) => res.status(201).send(data))
                .catch(next);
        };
    }
    update() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(updateCommunitySchema, req)
                .then(async (validated) => {
                    return await updateCommunity.execute(
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
                    return await deleteCommunity.execute(req.user.id, validated.params.uuid);
                })
                .then((data) => res.status(204).send(data))
                .catch(next);
        };
    }

    findByUuid() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    return await communityAdapter.findByUuid(validated.params.uuid);
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    listCreatedByUser() {
        return async (req: Request, res: Response, next: NextFunction) => {
            let { limit = 10, offset = 0 } = req.params;

            limit = Number(limit);
            offset = Number(offset);

            return await communityAdapter
                .listCreatedByUserUuid(req.user.id, { limit, offset })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    listProducts() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(listWithUuid, req)
                .then(async (validated) => {
                    return await productAdapter.listFromCommunity(validated.params.uuid, {
                        ...validated.query,
                    });
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }
}

export const communityController = new CommunityController();
