import { communitiesRequestsStatusEnum } from "../../../database/schema/communities-requests"

export type ListCommunityRequestsParams = {
	filter: {
		status?: communitiesRequestsStatusEnum[],
		communityUuid?: string
	},
	limit: number,
	offset: number

}
