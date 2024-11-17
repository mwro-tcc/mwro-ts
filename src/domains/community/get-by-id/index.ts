import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Community } from "../../../database/schema/communities";
import { User } from "../../../database/schema/users";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { databaseConnectionPool } from "../../../database";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";

type CommunityWithLazyLoadedAssets = Community & {
	creator: User;
	admins: User[];
}

export function makeGetCommunityByIdUseCase(db: NodePgDatabase = databaseConnectionPool) {
	return new GetCommunityById(
		makePgCommunityAdapter(db)
	);
}
class GetCommunityById {
	constructor(
		private readonly communityAdapter: ICommunityAdapter,
	) { }

	async execute(storeUuid: string, loggedUserUuid: string): Promise<CommunityWithLazyLoadedAssets> {
		const community = await this.communityAdapter.findByUuid(storeUuid);
		if (!community) throw new StatusError(404, ErrorMessages.assetNotFound)


		const [admins, creator] = await Promise.all([
			await this.communityAdapter.getCommunityAdmins(community.uuid),
			await this.communityAdapter.getCommunityCreator(community.uuid)
		])

		return { ...community, admins, creator }
	}
}


