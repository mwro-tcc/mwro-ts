import { sql } from 'drizzle-orm';
import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	uuid: uuid('uuid')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: varchar('name', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	password: varchar('password', { length: 256 }).notNull(),
	salt: varchar('salt', { length: 256 }).notNull(),
	createdAt: date('createdAt').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
