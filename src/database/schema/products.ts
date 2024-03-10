import { sql } from "drizzle-orm";
import { boolean, date, pgTable, uuid, varchar, real, text } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    uuid: uuid("uuid")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 256 }).notNull(),
    price: real("price").notNull(),
    stock: real("stock").notNull(),
    description: text("description"),

    createdAt: date("createdAt").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
