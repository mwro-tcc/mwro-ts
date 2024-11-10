import { Community } from "../../../database/schema/communities";
import { CommunityRequest } from "../../../database/schema/communities-requests";
import { Store } from "../../../database/schema/stores";
import { User } from "../../../database/schema/users";

export type CommunityRequestsFrontendReturn = CommunityRequest & {
	store: Store,
	user: User | null,
	community: Community
}
export interface ILoadCommunityRequests {
	execute(requests: CommunityRequest[], loggedUserUuid: string): Promise<CommunityRequestsFrontendReturn[]>
}
