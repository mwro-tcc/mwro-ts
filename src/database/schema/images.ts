import { sql } from "drizzle-orm";
import { customType, date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() {
        return "bytea"
    },
})

export const images = pgTable("images", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    assetUuid: uuid("assetUuid").notNull(),

    content: bytea("content").notNull(),
    format: varchar("format").notNull(),
    createdAt: date("createdAt").defaultNow().notNull(),
});

export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;
