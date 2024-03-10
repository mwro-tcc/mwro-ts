import { and, count, eq } from "drizzle-orm";
import {
    CommunityAdmin,
    NewCommunityAdmin,
    communitiesAdmins,
} from "../../../database/schema/communities-admins";
import { ICommunityAdminAdapter } from "./interface";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";

class CommunityAdminAdapter implements ICommunityAdminAdapter {
    constructor(private readonly db: NodePgDatabase) {}

    async create(params: NewCommunityAdmin): Promise<CommunityAdmin> {
        const data = await this.db.insert(communitiesAdmins).values(params).returning();
        return data[0];
    }

    async bulkCreate(payload: NewCommunityAdmin[]): Promise<void> {
        await this.db.insert(communitiesAdmins).values(payload).returning();
    }

    async getNumberOfCommunitiesCreated(userUuid: string): Promise<number> {
        const data = await this.db
            .select({ value: count() })
            .from(communitiesAdmins)
            .where(
                and(
                    eq(communitiesAdmins.userUuid, userUuid),
                    eq(communitiesAdmins.isCreator, true),
                ),
            );
        return data[0].value;
    }

    async findByUserAndCommunityUuid(
        userUuid: string,
        communityUuid: string,
    ): Promise<CommunityAdmin> {
        const data = await this.db
            .select()
            .from(communitiesAdmins)
            .where(
                and(
                    eq(communitiesAdmins.userUuid, userUuid),
                    eq(communitiesAdmins.communityUuid, communityUuid),
                ),
            );
        return data[0];
    }
    async findByUuid(uuid: string): Promise<CommunityAdmin> {
        const data = await this.db
            .select()
            .from(communitiesAdmins)
            .where(eq(communitiesAdmins.uuid, uuid));
        return data[0];
    }

    async delete(uuid: string): Promise<void> {
        await this.db.delete(communitiesAdmins).where(eq(communitiesAdmins.uuid, uuid));
    }
}

export function makeCommunityAdminAdapter(db: NodePgDatabase = databaseConnectionPool) {
    return new CommunityAdminAdapter(db);
}
