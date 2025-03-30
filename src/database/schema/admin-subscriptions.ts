import { sql } from "drizzle-orm";
import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { stripeEvents } from "./stripe-events";

export const adminSubscriptions = pgTable("admin_subscriptions", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    userUuid: uuid("userUuid")
        .references(() => users.uuid),

    objectId: varchar("objectId").notNull(),

    startsAt: timestamp("startsAt"),
    creationEventUuid: uuid("creationEventUuid").notNull().references(() => stripeEvents.uuid),

    expiresAt: timestamp("expiresAt"),

    cancelationEventUuid: uuid("cancelationEventUuid").references(() => stripeEvents.uuid),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AdminSubscription = typeof adminSubscriptions.$inferSelect;
export type NewAdminSubscription = typeof adminSubscriptions.$inferInsert;
