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
import { makeListCommunityRequests } from "../domains/community/list-requests";
import { makeUpdateRequestApprovalStatusUseCase } from "../domains/community/update-request-approval-status";
import { makeRequestAccessToCommunityUseCase } from "../domains/community/request-access";

const createCommunity = makeCreateCommunityUseCase();
const updateCommunity = makeUpdateCommunityUseCase();
const deleteCommunity = makeDeleteCommunityUseCase();
const parseProductRows = makeParseProductRowsUseCase(databaseConnectionPool)

const communityAdapter = makePgCommunityAdapter();
const productAdapter = makePgProductAdapter(databaseConnectionPool);
const storeAdapter = makePgStoreAdapter(databaseConnectionPool);
const GetStoreUseCase = makeGetStoreByIdUseCase(databaseConnectionPool);

const listCommunityRequests = makeListCommunityRequests(databaseConnectionPool)
const updateRequestStatus = makeUpdateRequestApprovalStatusUseCase(databaseConnectionPool)
const createRequest = makeRequestAccessToCommunityUseCase(databaseConnectionPool)

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

    listRequests() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;

            return await listCommunityRequests.execute(req.user.id, {
                limit,
                offset,
                filter: req.query as any
            })
                .then(data => res.status(200).send(data))
                .catch(next)
        };
    }

    createRequest() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await createRequest.execute({
                communityUuid: req.body.communityUuid,
                storeRequestingAccessUuid: req.body.storeUuid,
                loggedUserUuid: req.user.id
            })
                .then(data => res.status(201).send(data))
                .catch(next)
        };
    }

    updateRequestStatus() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await updateRequestStatus.execute({
                requestStatus: req.body.status,
                requestUuid: req.params.uuid,
                adminUserUuid: req.user.id
            })
                .then(data => res.status(201).send(data))
                .catch(next)
        };
    }
}

export const communityController = new CommunityController();
