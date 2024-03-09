import { sql } from "drizzle-orm";
import { date, pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { communities } from "./communities";
import { users } from "./users";

export const stores = pgTable("stores", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    userUuid: uuid("userUuid")
        .notNull()
        .references(() => users.uuid),
    communityUuid: uuid("communityUuid")
        .notNull()
        .references(() => communities.uuid),

    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),

    createdAt: date("createdAt").defaultNow().notNull(),
});

export type Store = typeof stores.$inferSelect;
export type NewStore = typeof stores.$inferInsert;
