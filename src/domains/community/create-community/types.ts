import { Community } from "../../../database/schema/communities";
import { CommunityAdmin } from "../../../database/schema/communities-admins";

export type CommunityCreationData = {
    name: string;
    latitude: number;
    longitude: number;
    isPrivate: boolean;
    description?: string;
};

export type CreateCommunityUseCasePayload = {
    creatorUserUuid: string;
    communityData: CommunityCreationData;
};

export type CreateCommunityUseCaseReturn = {
    community: Community;
    creator: CommunityAdmin;
};
