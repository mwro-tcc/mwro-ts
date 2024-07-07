import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { NewCommunity } from "../../../database/schema/communities";
import { makeCommunityAdapter } from "../../../infra/database/community";
import { makeCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { IUpdateCommunityUseCase } from "./interface";
import { databaseConnectionPool } from "../../../database";

class UpdateCommunityUseCase implements IUpdateCommunityUseCase {
    constructor(
        private readonly userAdapter: IUserAdapter,
        private readonly communityAdapter: ICommunityAdapter,
        private readonly communityAdminAdater: ICommunityAdminAdapter,
    ) {}

    async execute(
        userUuidRequestingUpdate: string,
        communityUuid: string,
        payload: Partial<NewCommunity>,
    ) {
        const [communityExists, userExists] = await Promise.all([
            this.communityAdapter.findByUuid(communityUuid),
            this.userAdapter.findByUuid(userUuidRequestingUpdate),
        ]);

        if (!userExists) throw new StatusError(404, ErrorMessages.userNotFound);
        if (!communityExists) throw new StatusError(404, ErrorMessages.communityNotFound);

        const userAdminRow = await this.communityAdminAdater.findByUserAndCommunityUuid(
            userUuidRequestingUpdate,
            communityUuid,
        );

        if (!userAdminRow) throw new StatusError(403, ErrorMessages.userNotAnAdmin);
        if (userAdminRow.isCreator === false)
            throw new StatusError(401, ErrorMessages.userNotCreator);

        const updatedCommunity = await this.communityAdapter.update(communityUuid, payload);

        return updatedCommunity;
    }
}

export function makeUpdateCommunityUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new UpdateCommunityUseCase(
        makePgUserAdapter(db),
        makeCommunityAdapter(db),
        makeCommunityAdminAdapter(db),
    );
}
