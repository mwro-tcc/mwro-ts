import { sql } from 'drizzle-orm';
import { boolean, date, pgTable, uuid, varchar, real, text } from 'drizzle-orm/pg-core';

export const communities = pgTable('communities', {
	uuid: uuid('uuid')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: varchar('name', { length: 256 }).notNull(),
	isPrivate: boolean('isPrivate').notNull().default(false),
	latitude: real('latitude').notNull(),
	longitude: real('longitude').notNull(),
	description: text('description'),

	createdAt: date('createdAt').defaultNow().notNull(),
});

export type Community = typeof communities.$inferSelect;
export type NewCommunity = typeof communities.$inferInsert;
