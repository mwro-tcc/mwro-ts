import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { makePgCommunityAdminAdapter } from "../../../infra/database/community-admin";
import { ICommunityAdminAdapter } from "../../../infra/database/community-admin/interface";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { IKickStore, IKickStoreParams } from "./interface";
import { databaseConnectionPool } from "../../../database";

class KickStoreFromCommunityUseCase implements IKickStore {
	constructor(
		private readonly storeAdapter: IStoreAdapter,
		private readonly communityAdminAdapter: ICommunityAdminAdapter
	) { }
	async execute(params: IKickStoreParams): Promise<void> {
		const admin = await this.communityAdminAdapter.findByUserAndCommunityUuid(params.adminUuid, params.communityUuid);
		if (!admin) throw new StatusError(400, ErrorMessages.userNotAnAdmin)

		const store = await this.storeAdapter.findByUuid(params.storeUuid)
		if (!store) throw new StatusError(404, ErrorMessages.storeNotFound)

		if (!store.communityUuid) throw new StatusError(400, ErrorMessages.storeNotInCommunity)

		await this.storeAdapter.update(params.storeUuid, { communityUuid: null })
	}
}

export function makeKickStoreFromCommunityUseCase(db: NodePgDatabase = databaseConnectionPool) {
	return new KickStoreFromCommunityUseCase(
		makePgStoreAdapter(db),
		makePgCommunityAdminAdapter(db)
	)
}
