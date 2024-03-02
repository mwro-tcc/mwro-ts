import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { makeCommunityAdapter } from "../../../infra/database/community";
import { makeCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { CreateCommunityUseCasePayload, CreateCommunityUseCaseReturn } from "./types";
import { databaseConnectionPool } from "../../../database";

class CreateCommunityUseCase {
    constructor(
        private readonly communityAdapter: ICommunityAdapter,
        private readonly communityAdminAdapter: ICommunityAdminAdapter,
    ) {}

    async execute(payload: CreateCommunityUseCasePayload): Promise<CreateCommunityUseCaseReturn> {
        //TODO after creating a subscription usecase, add the verification here.
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
    return new CreateCommunityUseCase(makeCommunityAdapter(db), makeCommunityAdminAdapter(db));
}
