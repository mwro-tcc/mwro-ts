import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ApproveCommunityRequestParams, IApproveRequestUseCase } from "./interface";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { makePgCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { communitiesRequestsStatusEnum } from "../../../database/schema/communities-requests";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";

export function makeUpdateRequestApprovalStatusUseCase(db: NodePgDatabase) {
	return new UpdateRequestApprovalStatusUseCase(
		makePgCommunityAdminAdapter(db),
		makePgCommunityAdapter(db),
		makePgStoreAdapter(db)
	)
}


class UpdateRequestApprovalStatusUseCase implements IApproveRequestUseCase {
	constructor(
		private readonly communityAdminAdapter: ICommunityAdminAdapter,
		private readonly communityAdapter: ICommunityAdapter,
		private readonly storeAdapter: IStoreAdapter
	) { }
	async execute(params: ApproveCommunityRequestParams): Promise<void> {
		const request = await this.communityAdapter.getAccessRequest(params.requestUuid)
		if (!request) throw new StatusError(404, ErrorMessages.assetNotFound)
		if (request.status !== communitiesRequestsStatusEnum.PENDING) throw new StatusError(404, ErrorMessages.requestAlreadyReviewed)

		const communityAdminRow = await this.communityAdminAdapter.findByUserAndCommunityUuid(params.adminUserUuid, request.communityUuid)

		if (!communityAdminRow) throw new StatusError(400, ErrorMessages.userNotAnAdmin)

		await this.storeAdapter.update(request.storeUuid, { communityUuid: request.communityUuid })
		await this.communityAdapter.updateAccessRequestStatus({
			requestUuid: request.uuid, status: params.requestStatus,
		})
	}
}
