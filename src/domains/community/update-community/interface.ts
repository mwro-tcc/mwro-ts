import { Community, NewCommunity } from "../../../database/schema/communities";

export interface IUpdateCommunityUseCase {
    execute(
        userUuidRequestingUpdate: string,
        communityUuid: string,
        payload: Partial<NewCommunity>,
    ): Promise<Community>;
}
