import {
    CommunityRequest,
    NewCommunityRequest,
    communitiesRequestsStatusEnum,
} from "../../../database/schema/communities-requests";
import { PaginationParams } from "../../../types/PaginationParams";

export interface ICommunityRequestsAdapter {
    createAccessRequest(params: NewCommunityRequest): Promise<CommunityRequest>;
    getAccessRequest(requestUuid: string): Promise<CommunityRequest>;
    updateAccessRequestStatus(params: {
        requestUuid: string;
        status: communitiesRequestsStatusEnum;
    }): Promise<CommunityRequest>;
    listPendingAccessRequestsFromUserCommunities(
        userUuid: string,
        params: PaginationParams,
    ): Promise<CommunityRequest[]>;
    listPendingAccessRequestsFromUserStores(
        userUuid: string,
        params: PaginationParams,
    ): Promise<CommunityRequest[]>;
    deleteAllFromStore(storeUuid: string): Promise<void>;
    deleteAllFromCommunity(communityUuid: string): Promise<void>;
}
