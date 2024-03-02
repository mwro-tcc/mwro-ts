import { and, eq } from "drizzle-orm";
import { Community, NewCommunity, communities } from "../../../database/schema/communities";
import { ICommunityAdapter } from "./interface";
import { communitiesAdmins } from "../../../database/schema/communities-admins";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";

class CommunityAdapter implements ICommunityAdapter {
    constructor(private readonly db: NodePgDatabase) {}
    async create(input: NewCommunity): Promise<Community> {
        const data = await this.db.insert(communities).values(input).returning();
        return data[0];
    }

    async update(uuid: string, input: Partial<NewCommunity>): Promise<Community> {
        const data = await this.db
            .update(communities)
            .set(input)
            .where(eq(communities.uuid, uuid))
            .returning();
        return data[0];
    }

    async findByUuid(uuid: string): Promise<Community> {
        const data = await this.db.select().from(communities).where(eq(communities.uuid, uuid));
        return data[0];
    }

    async delete(uuid: string): Promise<void> {
        await this.db.delete(communities).where(eq(communities.uuid, uuid));
    }

    async listCreatedByUserUuid(userUuid: string, params: { limit: number; offset: number }) {
        return await this.db
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

export function makeCommunityAdapter(db: NodePgDatabase = databaseConnectionPool) {
    return new CommunityAdapter(db);
}
