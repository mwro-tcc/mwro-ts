import { Community, NewCommunity } from "../../../database/schema/communities";
import { CommunityRequest, NewCommunityRequest, communitiesRequestsStatusEnum } from "../../../database/schema/communities-requests";
import { ListCommunityRequestsParams } from "../../../domains/community/list-requests/types";

export interface ICommunityAdapter {
    bulkCreate(payload: NewCommunity[]): Promise<void>;
    create(params: NewCommunity): Promise<Community>;
    findByUuid(uuid: string): Promise<Community>;
    update(uuid: string, data: Partial<NewCommunity>): Promise<Community>;
    delete(uuid: string): Promise<void>;
    listCreatedByUserUuid(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<Community[]>;
    list(params: { limit: number; offset: number }): Promise<Community[]>;
    searchByName(
        name: string,
        params: { limit: number; offset: number },
    ): Promise<Community[]>;
    createAccessRequest(params: NewCommunityRequest): Promise<CommunityRequest>
    getAccessRequest(requestUuid: string): Promise<CommunityRequest>
    updateAccessRequestStatus(params: { requestUuid: string, status: communitiesRequestsStatusEnum }): Promise<CommunityRequest>
    listAccessRequest(params: ListCommunityRequestsParams): Promise<CommunityRequest[]>
}
