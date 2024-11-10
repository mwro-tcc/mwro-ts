import { CommunityRequest } from "../../../database/schema/communities-requests";
import { CommunityRequestsFrontendReturn, ILoadCommunityRequests } from "./interface";

import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IGetStoreByUuid } from "../../store/get-store-by-id/interface";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makePgUserAdapter } from "../../../infra/database/user";
import { makeGetStoreByIdUseCase } from "../../store/get-store-by-id";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgCommunityAdapter } from "../../../infra/database/community";

export function makeLoadCommunityRequestsUseCase(db: NodePgDatabase) {
	return new LoadCommunityRequestsUseCase(
		makeGetStoreByIdUseCase(db),
		makePgUserAdapter(db),
		makePgCommunityAdapter(db)
	)
}
class LoadCommunityRequestsUseCase implements ILoadCommunityRequests {
	constructor(
		private readonly getStore: IGetStoreByUuid,
		private readonly userAdapter: IUserAdapter,
		private readonly communityAdapter: ICommunityAdapter
	) { }
	async execute(requests: CommunityRequest[], loggedUserUuid: string): Promise<CommunityRequestsFrontendReturn[]> {
		const data = await Promise.all(requests.map(async request => {
			const store = await this.getStore.execute(request.storeUuid, loggedUserUuid)
			const community = await this.communityAdapter.findByUuid(request.communityUuid)

			let user = null
			if (request.reviewedByUser) {
				user = await this.userAdapter.findByUuid(request.reviewedByUser)
			}


			return { ...request, store, user, community }
		}))
		return data
	}
}
