import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { NewCommunity } from "../../../database/schema/communities";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { makePgCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { IUpdateCommunityUseCase } from "./interface";
import { databaseConnectionPool } from "../../../database";
import { IAssureHasActiveSubscriptionUseCase } from "../../user/assure-has-subscription/interface";
import { makeAssureHasSubscriptionUseCase } from "../../user/assure-has-subscription";

class UpdateCommunityUseCase implements IUpdateCommunityUseCase {
    constructor(
        private readonly assureHasSubscription: IAssureHasActiveSubscriptionUseCase,
        private readonly userAdapter: IUserAdapter,
        private readonly communityAdapter: ICommunityAdapter,
        private readonly communityAdminAdater: ICommunityAdminAdapter,
    ) { }

    async execute(
        userUuidRequestingUpdate: string,
        communityUuid: string,
        payload: Partial<NewCommunity>,
    ) {
        await this.assureIdsAreValid(userUuidRequestingUpdate, communityUuid)
        await this.assureIsAdminAndCreator(userUuidRequestingUpdate, communityUuid)

        // Theoretically, this case never happens because the communities are supposed to be deleted if the user is no longer an admin
        await this.assureHasSubscription.execute(userUuidRequestingUpdate)

        const updatedCommunity = await this.communityAdapter.update(communityUuid, payload);

        return updatedCommunity;
    }

    private async assureIdsAreValid(userUuid: string, communityUuid: string): Promise<void> {
        const [communityExists, userExists] = await Promise.all([
            this.communityAdapter.findByUuid(communityUuid),
            this.userAdapter.findByUuid(userUuid),
        ]);

        if (!userExists) throw new StatusError(404, ErrorMessages.userNotFound);
        if (!communityExists) throw new StatusError(404, ErrorMessages.communityNotFound);
    }

    private async assureIsAdminAndCreator(userUuid: string, communityUuid: string): Promise<void> {
        const userAdminRow = await this.communityAdminAdater.findByUserAndCommunityUuid(
            userUuid,
            communityUuid,
        );

        if (!userAdminRow) throw new StatusError(403, ErrorMessages.userNotAnAdmin);

        if (userAdminRow.isCreator === false)
            throw new StatusError(401, ErrorMessages.userNotCreator);
    }
}

export function makeUpdateCommunityUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new UpdateCommunityUseCase(
        makeAssureHasSubscriptionUseCase(db),
        makePgUserAdapter(db),
        makePgCommunityAdapter(db),
        makePgCommunityAdminAdapter(db),
    );
}
