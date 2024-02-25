import { Community, NewCommunity } from "../../../database/schema/communities";

export interface ICommunityAdapter {
    create(params: NewCommunity): Promise<Community>;
    findByUuid(uuid: string): Promise<Community>;
    update(uuid: string, data: Partial<NewCommunity>): Promise<Community>;
}
