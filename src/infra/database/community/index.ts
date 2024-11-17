import { eq, sql, inArray, desc, ilike, and } from "drizzle-orm";
import { Community, NewCommunity, communities } from "../../../database/schema/communities";
import { ICommunityAdapter } from "./interface";
import { communitiesAdmins } from "../../../database/schema/communities-admins";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";
import { User, users } from "../../../database/schema/users";

class PgCommunityAdapter implements ICommunityAdapter {
    constructor(private readonly db: NodePgDatabase) { }
    async create(input: NewCommunity): Promise<Community> {
        const data = await this.db.insert(communities).values(input).returning();
        return data[0];
    }

    async bulkCreate(payload: NewCommunity[]): Promise<void> {
        await this.db.insert(communities).values(payload).returning();
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
        const selectCommunityUuidsFromUserUuid = sql`(
        SELECT
            ${communitiesAdmins.communityUuid}
        FROM ${communitiesAdmins}
        WHERE 
            ${communitiesAdmins.userUuid} = ${userUuid}
            AND ${communitiesAdmins.isCreator} IS true
        GROUP BY ${communitiesAdmins.communityUuid}
        )`;

        return await this.db
            .select()
            .from(communities)
            .where(inArray(communities.uuid, selectCommunityUuidsFromUserUuid))
            .orderBy(desc(communities.createdAt))
            .limit(params.limit)
            .offset(params.offset);
    }

    async list(params: { limit: number; offset: number }) {
        return await this.db
            .select()
            .from(communities)
            .orderBy(desc(communities.createdAt))
            .limit(params.limit)
            .offset(params.offset);
    }

    async searchByName(
        name: string,
        params: { limit: number; offset: number },
    ): Promise<Community[]> {
        const lastChar = name[name.length - 1];
        if (lastChar !== "%") {
            name = name + "%";
        }

        return await this.db
            .select()
            .from(communities)
            .where(ilike(communities.name, name))
            .orderBy(desc(communities.createdAt))
            .limit(params.limit)
            .offset(params.offset);
    }

    async getCommunityCreator(communityUuid: string): Promise<User> {
        const user = await this.db
            .select({ user: users })
            .from(communitiesAdmins)
            .innerJoin(
                users,
                eq(communitiesAdmins.userUuid, users.uuid)
            )
            .where(
                eq(communitiesAdmins.communityUuid, communityUuid)
            )
            .then(data => data[0]?.user)
        return user
    }

    async getCommunityAdmins(communityUuid: string): Promise<User[]> {
        const user = await this.db
            .select({ user: users })
            .from(communitiesAdmins)
            .innerJoin(
                users,
                eq(communitiesAdmins.userUuid, users.uuid)
            )
            .where(
                eq(communitiesAdmins.communityUuid, communityUuid)
            )
            .then(data => data.map(d => d.user))
        return user
    }

}

export function makePgCommunityAdapter(db: NodePgDatabase = databaseConnectionPool) {
    return new PgCommunityAdapter(db);
}
