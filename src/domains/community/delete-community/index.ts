import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { makePgCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { databaseConnectionPool } from "../../../database";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { ICommunityRequestsAdapter } from "../../../infra/database/community-requests/interface";
import { makePgCommunityRequestsAdapter } from "../../../infra/database/community-requests";

class DeleteCommunityUseCase {
    constructor(
        private readonly communityAdapter: ICommunityAdapter,
        private readonly communityAdminAdapter: ICommunityAdminAdapter,
        private readonly communityRequestsAdapter: ICommunityRequestsAdapter,
        private readonly storeAdapter: IStoreAdapter,
        private readonly userAdapter: IUserAdapter,
    ) {}

    async execute(userUuidRequestingDeletion: string, communityUuid: string): Promise<void> {
        const [communityExists, userExists] = await Promise.all([
            this.communityAdapter.findByUuid(communityUuid),
            this.userAdapter.findByUuid(userUuidRequestingDeletion),
        ]);

        if (!userExists) throw new StatusError(404, ErrorMessages.userNotFound);
        if (!communityExists) throw new StatusError(404, ErrorMessages.communityNotFound);

        const userAdminRow = await this.communityAdminAdapter.findByUserAndCommunityUuid(
            userUuidRequestingDeletion,
            communityUuid,
        );

        if (!userAdminRow) throw new StatusError(403, ErrorMessages.userNotAnAdmin);
        if (userAdminRow.isCreator === false)
            throw new StatusError(401, ErrorMessages.userNotCreator);

        await this.storeAdapter.unnassociateFromCommunity(communityUuid);
        await this.communityRequestsAdapter.deleteAllFromCommunity(communityUuid);
        await this.communityAdminAdapter.delete(userAdminRow.uuid);
        await this.communityAdapter.delete(communityUuid);
    }
}

export function makeDeleteCommunityUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new DeleteCommunityUseCase(
        makePgCommunityAdapter(db),
        makePgCommunityAdminAdapter(db),
        makePgCommunityRequestsAdapter(db),
        makePgStoreAdapter(db),
        makePgUserAdapter(db),
    );
}
