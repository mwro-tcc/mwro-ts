import { Community, NewCommunity } from "../../../database/schema/communities";

export interface ICommunityAdapter {
	create(params: NewCommunity): Promise<Community>
}
