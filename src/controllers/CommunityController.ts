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
import { makePgStoreAdapter } from "../infra/database/store";
import { listWithUuidFilterValidation } from "../validations/ListWithUuidFilter";
import { makeGetStoreByIdUseCase } from "../domains/store/get-store-by-id";
import { paginationParamsValidation } from "../validations/PaginationParamsValidation";
import { makeParseProductRowsUseCase } from "../domains/product/parse-product-rows";
import { makeGetCommunityByIdUseCase } from "../domains/community/get-by-id";
import { makeKickStoreFromCommunityUseCase } from "../domains/community/kick-store";
import { kickStoreSchema } from "../validations/KickStore";

const createCommunity = makeCreateCommunityUseCase();
const updateCommunity = makeUpdateCommunityUseCase();
const deleteCommunity = makeDeleteCommunityUseCase();
const parseProductRows = makeParseProductRowsUseCase(databaseConnectionPool);
const getCommunityById = makeGetCommunityByIdUseCase(databaseConnectionPool);

const communityAdapter = makePgCommunityAdapter();
const productAdapter = makePgProductAdapter(databaseConnectionPool);
const storeAdapter = makePgStoreAdapter(databaseConnectionPool);
const GetStoreUseCase = makeGetStoreByIdUseCase(databaseConnectionPool);

const kickStoreUseCase = makeKickStoreFromCommunityUseCase(databaseConnectionPool)

class CommunityController {
    list() {
        return async (req: any, res: Response, next: NextFunction) => {
            return await validate(paginationParamsValidation, req)
                .then(async (validated) => {
                    const limit = Number(validated.query.limit) || 10;
                    const offset = Number(validated.query.offset) || 0;
                    if (req.query?.term) {
                        return await communityAdapter.searchByName(req.query.term, {
                            limit,
                            offset,
                        });

                    }

                    return await communityAdapter.list({
                        limit,
                        offset,
                    });
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

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
                    return await getCommunityById.execute(validated.params.uuid, req.user.id)
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
                    const limit = Number(validated.query.limit) || 10;
                    const offset = Number(validated.query.offset) || 0;

                    const products = await productAdapter.listFromCommunity(validated.params.uuid, {
                        limit,
                        offset,
                    });
                    return await parseProductRows.execute(products, req.user.id)
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    listStores() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(listWithUuidFilterValidation, req)
                .then(async (validated) => {
                    const limit = Number(validated.query.limit) || 10;
                    const offset = Number(validated.query.offset) || 0;

                    const stores = await storeAdapter.listFromCommunity(validated.params.uuid, {
                        limit,
                        offset,
                    });

                    const data = await Promise.all(
                        stores.map((s) => GetStoreUseCase.execute(s.uuid, req.user.id)),
                    );

                    return data
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    kickStore() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(kickStoreSchema, req)
                .then(async (validated) => {
                    return await kickStoreUseCase.execute({
                        communityUuid: validated.params.uuid,
                        adminUuid: req.user.id,
                        storeUuid: validated.body.storeUuid,
                    });
                })
                .then(() => res.status(204).send())
                .catch(next);
        };
    }
}

export const communityController = new CommunityController();
