import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { makeCommunityAdapter } from "../../../infra/database/community";
import { makeCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makeUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";

class DeleteCommunityUseCase {
    constructor(
        private readonly communityAdapter: ICommunityAdapter,
        private readonly communityAdminAdapter: ICommunityAdminAdapter,
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

        await this.communityAdminAdapter.delete(userAdminRow.uuid);
        await this.communityAdapter.delete(communityUuid);
    }
}

export function makeDeleteCommunityUseCase() {
    return new DeleteCommunityUseCase(
        makeCommunityAdapter(),
        makeCommunityAdminAdapter(),
        makeUserAdapter(),
    );
}
