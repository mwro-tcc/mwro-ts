import { db } from "../../../database";
import { Community, NewCommunity, communities } from "../../../database/schema/communities";
import { ICommunityAdapter } from "./interface";

class CommunityAdapter implements ICommunityAdapter {
	constructor() { }
	async create(input: NewCommunity): Promise<Community> {
		const data = await db.insert(communities).values(input).returning();
		return data[0]
	}

}

export function makeCommunityAdapter() {
	return new CommunityAdapter()
}
