import { CommunityAdmin, NewCommunityAdmin } from "../../../database/schema/communities-admins";

export interface ICommunityAdminAdapter {
	create(params: NewCommunityAdmin): Promise<CommunityAdmin>
	getNumberOfCommunitiesCreated(userUuid: string): Promise<number>
}
