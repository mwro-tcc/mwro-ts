import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { makePgCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { CreateCommunityUseCasePayload, CreateCommunityUseCaseReturn } from "./types";
import { databaseConnectionPool } from "../../../database";
import { IAssureHasActiveSubscriptionUseCase } from "../../user/assure-has-subscription/interface";
import { makeAssureHasSubscriptionUseCase } from "../../user/assure-has-subscription";

class CreateCommunityUseCase {
    constructor(
        private readonly assureHasSubscription: IAssureHasActiveSubscriptionUseCase,
        private readonly communityAdapter: ICommunityAdapter,
        private readonly communityAdminAdapter: ICommunityAdminAdapter,
    ) { }

    async execute(payload: CreateCommunityUseCasePayload): Promise<CreateCommunityUseCaseReturn> {
        await this.assureHasSubscription.execute(payload.creatorUserUuid)

        const community = await this.communityAdapter.create(payload.communityData);
        const communityCreator = await this.communityAdminAdapter.create({
            userUuid: payload.creatorUserUuid,
            isCreator: true,
            communityUuid: community.uuid,
        });

        const returnValues: CreateCommunityUseCaseReturn = {
            community,
            creator: communityCreator,
        };
        return returnValues;
    }
}

export function makeCreateCommunityUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new CreateCommunityUseCase(makeAssureHasSubscriptionUseCase(db), makePgCommunityAdapter(db), makePgCommunityAdminAdapter(db));
}
