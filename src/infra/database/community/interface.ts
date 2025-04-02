import { Community, NewCommunity } from "../../../database/schema/communities";
import { User } from "../../../database/schema/users";

export interface ICommunityAdapter {
    bulkCreate(payload: NewCommunity[]): Promise<void>;
    create(params: NewCommunity): Promise<Community>;
    findByUuid(uuid: string): Promise<Community>;
    update(uuid: string, data: Partial<NewCommunity>): Promise<Community>;
    delete(uuid: string): Promise<void>;
    listCreatedByUserUuid(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<Community[]>;
    list(params: { limit: number; offset: number }): Promise<Community[]>;
    searchByName(
        name: string,
        params: { limit: number; offset: number },
    ): Promise<Community[]>;
    getCommunityCreator(communityUuid: string): Promise<User>
    getCommunityAdmins(communityUuid: string): Promise<User[]>;
    deleteAllFromUser(userUuid: string): Promise<void>
}
