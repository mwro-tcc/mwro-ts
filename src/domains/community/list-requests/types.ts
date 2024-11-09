import { communitiesRequestsStatusEnum } from "../../../database/schema/communities-requests"

export type ListCommunityRequestsParams = {
	filter: {
		status?: communitiesRequestsStatusEnum | communitiesRequestsStatusEnum[],
		communityUuid?: string,
		storeUuid?: string
	},
	limit: number,
	offset: number

}
