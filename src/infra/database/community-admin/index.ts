import { and, count, eq } from "drizzle-orm";
import { db } from "../../../database";
import { CommunityAdmin, NewCommunityAdmin, communitiesAdmins } from "../../../database/schema/communities-admins";
import { ICommunityAdminAdapter } from "./interface";

class CommunityAdminAdapter implements ICommunityAdminAdapter {
	constructor() { }

	async create(params: NewCommunityAdmin): Promise<CommunityAdmin> {
		const data = await db.insert(communitiesAdmins).values(params).returning();
		return data[0]
	}

	async getNumberOfCommunitiesCreated(userUuid: string): Promise<number> {
		const data = await db.select({ value: count() }).from(communitiesAdmins).where(
			and(
				eq(communitiesAdmins.userUuid, userUuid),
				eq(communitiesAdmins.isCreator, true)
			)
		)
		return data[0].value
	}
}

export function makeCommunityAdminAdapter() {
	return new CommunityAdminAdapter()
}
