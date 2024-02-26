import { Community, NewCommunity } from "../../../database/schema/communities";

export interface ICommunityAdapter {
    create(params: NewCommunity): Promise<Community>;
    findByUuid(uuid: string): Promise<Community>;
    update(uuid: string, data: Partial<NewCommunity>): Promise<Community>;
    delete(uuid: string): Promise<void>;
    listCreatedByUserUuid(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<any>;
}
