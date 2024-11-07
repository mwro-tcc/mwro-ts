import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { ListCommunityRequestsParams } from "./types";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { makePgCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { IGetStoreByUuid } from "../../store/get-store-by-id/interface";
import { makeGetStoreByIdUseCase } from "../../store/get-store-by-id";
import { CommunityRequest } from "../../../database/schema/communities-requests";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makePgUserAdapter } from "../../../infra/database/user";

export function makeListCommunityRequests(db: NodePgDatabase) {
	return new ListCommunityRequests(
		makeGetStoreByIdUseCase(db),
		makePgCommunityAdapter(db),
		makePgCommunityAdminAdapter(db),
		makePgUserAdapter(db)
	)
}

class ListCommunityRequests {
	constructor(
		private readonly getStore: IGetStoreByUuid,
		private readonly communityAdapter: ICommunityAdapter,
		private readonly communityAdminAdapter: ICommunityAdminAdapter,
		private readonly userAdapter: IUserAdapter
	) { }
	async execute(adminUuid: string, listParams: ListCommunityRequestsParams) {
		console.log(listParams)
		if (!listParams.filter.communityUuid) throw new StatusError(400, ErrorMessages.operationNotAllowed)
		const adminRow = await this.communityAdminAdapter.findByUserAndCommunityUuid(adminUuid, listParams.filter.communityUuid)
		if (!adminRow) throw new StatusError(400, ErrorMessages.userNotAnAdmin)

		const rows = await this.communityAdapter.listAccessRequest(listParams)
		const lazyLoaded = await Promise.all(rows.map(r => this.lazyLoad(r, adminUuid)))
		return lazyLoaded
	}
	private async lazyLoad(request: CommunityRequest, adminUuid: string) {
		const store = await this.getStore.execute(request.storeUuid, adminUuid)

		let user = null
		if (request.reviewedByUser) {
			user = await this.userAdapter.findByUuid(request.reviewedByUser)
		}

		return { ...request, store, user }
	}
}
