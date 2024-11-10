import { Request, Response, NextFunction } from "express";
import { databaseConnectionPool } from "../database";
import { makeListUserCommunitiesRequests } from "../domains/communities-requests/user-communities-requests";
import { makeListUserStoresRequests } from "../domains/communities-requests/user-stores-requests";
import { makeUpdateRequestApprovalStatusUseCase } from "../domains/communities-requests/update-request-approval-status";
import { makeRequestAccessToCommunityUseCase } from "../domains/communities-requests/request-access";

const listStoresRequests = makeListUserStoresRequests(databaseConnectionPool)
const listCommunityRequests = makeListUserCommunitiesRequests(databaseConnectionPool)
const updateRequestStatus = makeUpdateRequestApprovalStatusUseCase(databaseConnectionPool)
const createRequest = makeRequestAccessToCommunityUseCase(databaseConnectionPool)

class CommunityRequestsController {
    listUserCommunitiesPendingRequests() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;

            return await listCommunityRequests.execute(req.user.id, {
                limit,
                offset,
            })
                .then(data => res.status(200).send(data))
                .catch(next)
        };
    }

    listUserStoresPendingRequests() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;

            return await listStoresRequests.execute(req.user.id, {
                limit,
                offset,
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

export const communityRequestsController = new CommunityRequestsController();
