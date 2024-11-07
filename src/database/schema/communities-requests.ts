import { sql } from "drizzle-orm";
import { date, pgTable, uuid, pgEnum } from "drizzle-orm/pg-core";
import { communities } from "./communities";
import { stores } from "./stores";
import { users } from "./users";

export enum communitiesRequestsStatusEnum {
    APPROVED = "approved",
    PENDING = "pending",
    DENIED = "denied"
}

export const communitiesRequestsStatus = pgEnum('requeststatus', Object.values(communitiesRequestsStatusEnum) as [string, ...string[]])

export const communitiesRequests = pgTable("communities_requests", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    storeUuid: uuid("storeUuid")
        .notNull()
        .references(() => stores.uuid),
    communityUuid: uuid("communityUuid")
        .notNull()
        .references(() => communities.uuid),
    status: communitiesRequestsStatus('status').default('pending').notNull(),
    createdAt: date("createdAt").defaultNow().notNull(),

    reviewedByUser:
        uuid("reviewedByUser")
            .references(() => users.uuid),
});

export type CommunityRequest = typeof communitiesRequests.$inferSelect;
export type NewCommunityRequest = typeof communitiesRequests.$inferInsert;
