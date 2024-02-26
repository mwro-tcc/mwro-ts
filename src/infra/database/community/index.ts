import { and, eq } from "drizzle-orm";
import { db } from "../../../database";
import { Community, NewCommunity, communities } from "../../../database/schema/communities";
import { ICommunityAdapter } from "./interface";
import { communitiesAdmins } from "../../../database/schema/communities-admins";

class CommunityAdapter implements ICommunityAdapter {
    constructor() {}
    async create(input: NewCommunity): Promise<Community> {
        const data = await db.insert(communities).values(input).returning();
        return data[0];
    }

    async update(uuid: string, input: Partial<NewCommunity>): Promise<Community> {
        const data = await db
            .update(communities)
            .set(input)
            .where(eq(communities.uuid, uuid))
            .returning();
        return data[0];
    }

    async findByUuid(uuid: string): Promise<Community> {
        const data = await db.select().from(communities).where(eq(communities.uuid, uuid));
        return data[0];
    }

    async delete(uuid: string): Promise<void> {
        await db.delete(communities).where(eq(communities.uuid, uuid));
    }

    async listCreatedByUserUuid(userUuid: string, params: { limit: number; offset: number }) {
        return db
            .select({ community: communities })
            .from(communities)
            .innerJoin(communitiesAdmins, eq(communitiesAdmins.communityUuid, communities.uuid))
            .where(
                and(
                    eq(communitiesAdmins.isCreator, true),
                    eq(communitiesAdmins.userUuid, userUuid),
                ),
            )
            .limit(params.limit)
            .offset(params.offset);
    }
}

export function makeCommunityAdapter() {
    return new CommunityAdapter();
}
