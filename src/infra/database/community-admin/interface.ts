import { CommunityAdmin, NewCommunityAdmin } from "../../../database/schema/communities-admins";

export interface ICommunityAdminAdapter {
    create(params: NewCommunityAdmin): Promise<CommunityAdmin>;
    getNumberOfCommunitiesCreated(userUuid: string): Promise<number>;
    findByUserAndCommunityUuid(userUuid: string, communityUuid: string): Promise<CommunityAdmin>;
    findByUuid(uuid: string): Promise<CommunityAdmin>;
    delete(uuid: string): Promise<void>;
}
