import { sql } from "drizzle-orm";
import { pgTable, uuid, jsonb, time } from "drizzle-orm/pg-core";

export const stripeEvents = pgTable("stripe_events", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    event: jsonb("event"),
    createdAt: time("createdAt").defaultNow().notNull(),
});

export type StripeEvent = typeof stripeEvents.$inferSelect;
export type NewStripeEvent = typeof stripeEvents.$inferInsert;
