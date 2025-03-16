import { eq, inArray, desc, and } from "drizzle-orm";
import { ICommunityRequestsAdapter } from "./interface";
import { communitiesAdmins } from "../../../database/schema/communities-admins";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";
import {
    CommunityRequest,
    NewCommunityRequest,
    communitiesRequests,
    communitiesRequestsStatusEnum,
} from "../../../database/schema/communities-requests";
import { PaginationParams } from "../../../types/PaginationParams";
import { stores } from "../../../database/schema/stores";

class PgCommunityRequestsAdapter implements ICommunityRequestsAdapter {
    constructor(private readonly db: NodePgDatabase) {}
    async createAccessRequest(params: NewCommunityRequest): Promise<CommunityRequest> {
        const data = await this.db.insert(communitiesRequests).values(params).returning();
        return data[0];
    }

    async getAccessRequest(requestUuid: string): Promise<CommunityRequest> {
        const data = await this.db
            .select()
            .from(communitiesRequests)
            .where(eq(communitiesRequests.uuid, requestUuid));
        return data[0];
    }

    async listPendingAccessRequestsFromUserCommunities(
        userUuid: string,
        params: PaginationParams,
    ): Promise<CommunityRequest[]> {
        const data = await this.db
            .select({
                request: communitiesRequests,
            })
            .from(communitiesRequests)
            .innerJoin(
                communitiesAdmins,
                and(
                    eq(communitiesAdmins.communityUuid, communitiesRequests.communityUuid),
                    eq(communitiesAdmins.userUuid, userUuid),
                ),
            )
            .where(eq(communitiesRequests.status, communitiesRequestsStatusEnum.PENDING))
            .orderBy(desc(communitiesRequests.createdAt))
            .limit(params.limit)
            .offset(params.offset)
            .then((data) => data.map((d) => d.request));
        return data;
    }

    async listPendingAccessRequestsFromUserStores(
        userUuid: string,
        params: PaginationParams,
    ): Promise<CommunityRequest[]> {
        const data = await this.db
            .select({
                request: communitiesRequests,
            })
            .from(communitiesRequests)
            .innerJoin(
                stores,
                and(eq(stores.uuid, communitiesRequests.storeUuid), eq(stores.userUuid, userUuid)),
            )
            .where(eq(communitiesRequests.status, communitiesRequestsStatusEnum.PENDING))
            .orderBy(desc(communitiesRequests.createdAt))
            .limit(params.limit)
            .offset(params.offset)
            .then((data) => data.map((d) => d.request));
        return data;
    }

    async updateAccessRequestStatus(params: {
        requestUuid: string;
        reviewedByUser: string;
        status: communitiesRequestsStatusEnum;
    }): Promise<CommunityRequest> {
        const data = await this.db
            .update(communitiesRequests)
            .set({ status: params.status, reviewedByUser: params.reviewedByUser })
            .where(eq(communitiesRequests.uuid, params.requestUuid))
            .returning();
        return data[0];
    }

    async deleteAllFromStore(storeUuid: string): Promise<void> {
        await this.db
            .delete(communitiesRequests)
            .where(eq(communitiesRequests.storeUuid, storeUuid));
    }
}

export function makePgCommunityRequestsAdapter(db: NodePgDatabase = databaseConnectionPool) {
    return new PgCommunityRequestsAdapter(db);
}
