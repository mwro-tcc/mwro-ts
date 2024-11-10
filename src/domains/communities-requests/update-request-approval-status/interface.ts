import { communitiesRequestsStatusEnum } from "../../../database/schema/communities-requests";

export interface IApproveRequestUseCase {
	execute(params: ApproveCommunityRequestParams): Promise<void>
}

export type ApproveCommunityRequestParams = {
	adminUserUuid: string;
	requestUuid: string;
	requestStatus: communitiesRequestsStatusEnum,
}
