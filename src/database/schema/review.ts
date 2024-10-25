
import { sql } from "drizzle-orm";
import { date, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const reviews = pgTable("reviews", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    assetUuid: uuid("assetUuid").notNull(),
    userUuid: uuid("userUuid").references(() => users.uuid).notNull(),
    score: integer("score").notNull(),
    comment: text("comment"),

    createdAt: date("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
