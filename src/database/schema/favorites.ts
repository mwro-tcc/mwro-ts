
import { sql } from "drizzle-orm";
import { date, pgTable, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const favorites = pgTable("favorites", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    assetUuid: uuid("assetUuid").notNull(),
    userUuid: uuid("userUuid").references(() => users.uuid).notNull(),

    createdAt: date("createdAt").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferInsert;
