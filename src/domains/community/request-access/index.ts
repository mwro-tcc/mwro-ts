import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { IRequestAccessToCommunity } from "./interface";
import { RequestAccessToCommunityParams } from "./types";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { makePgCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IApproveRequestUseCase } from "../update-request-approval-status/interface";
import { communitiesRequestsStatusEnum } from "../../../database/schema/communities-requests";
import { makeUpdateRequestApprovalStatusUseCase } from "../update-request-approval-status";

export function makeRequestAccessToCommunityUseCase(db: NodePgDatabase) {
	return new RequestAccessToCommunityUseCase(
		makeUpdateRequestApprovalStatusUseCase(db),
		makePgCommunityAdapter(db),
		makePgCommunityAdminAdapter(db),
		makePgStoreAdapter(db)
	)
}

class RequestAccessToCommunityUseCase implements IRequestAccessToCommunity {
	constructor(
		private readonly approveRequestUseCase: IApproveRequestUseCase,
		private readonly communityAdapter: ICommunityAdapter,
		private readonly communityAdminAdapter: ICommunityAdminAdapter,
		private readonly storeAdapter: IStoreAdapter,
	) { }
	async execute(params: RequestAccessToCommunityParams): Promise<void> {
		const store = await this.storeAdapter.findByUuid(params.storeRequestingAccessUuid)
		if (!store) throw new StatusError(404, ErrorMessages.assetNotFound)

		const isStoreCreatorRequestingAccess = store.userUuid === params.loggedUserUuid
		if (!isStoreCreatorRequestingAccess) throw new StatusError(400, ErrorMessages.userIsNotStoreOwner)

		if (store.communityUuid) throw new StatusError(400, ErrorMessages.storeAlreadyBelongsToACommunity)

		const request = await this.communityAdapter.createAccessRequest({
			communityUuid: params.communityUuid,
			storeUuid: params.storeRequestingAccessUuid,
		})

		// If a community admin is creating the request, it will automatically be approved
		const communityAdminRow = await this.communityAdminAdapter.findByUserAndCommunityUuid(
			params.loggedUserUuid,
			params.communityUuid
		)
		const isCommunityAdminRequestingAccess = !!communityAdminRow
		if (!isCommunityAdminRequestingAccess) return
		await this.approveRequestUseCase.execute({
			adminUserUuid: communityAdminRow.userUuid,
			requestUuid: request.uuid,
			requestStatus: communitiesRequestsStatusEnum.APPROVED
		})
	}
}
