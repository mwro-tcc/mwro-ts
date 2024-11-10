import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ICommunityRequestsAdapter } from "../../../infra/database/community-requests/interface";
import { makePgCommunityRequestsAdapter } from "../../../infra/database/community-requests";
import { makeLoadCommunityRequestsUseCase } from "../load-requests";
import { ILoadCommunityRequests } from "../load-requests/interface";
import { PaginationParams } from "../../../types/PaginationParams";

export function makeListUserStoresRequests(db: NodePgDatabase) {
	return new ListUserStoresRequests(
		makePgCommunityRequestsAdapter(db),
		makeLoadCommunityRequestsUseCase(db)
	)
}

class ListUserStoresRequests {
	constructor(
		private readonly communityRequestsAdapter: ICommunityRequestsAdapter,
		private readonly loadCommunityRequests: ILoadCommunityRequests
	) { }
	async execute(loggedUserUuid: string, listParams: PaginationParams) {
		const rows = await this.communityRequestsAdapter.listPendingAccessRequestsFromUserStores(loggedUserUuid, listParams)
		const lazyLoaded = await this.loadCommunityRequests.execute(rows, loggedUserUuid)
		return lazyLoaded
	}
}
