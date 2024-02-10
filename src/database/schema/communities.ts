import { SQL, sql } from 'drizzle-orm';
import { boolean, customType, date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

interface Point {
	latitude: number;
	longitude: number;
}

export const point = customType<{
	data: Point;
	driverData: SQL<string>
}>({
	toDriver({ latitude, longitude }) {
		return sql`ST_GeomFromText('POINT(${longitude} ${latitude})')`
	},
	dataType() {
		return "geography(Point)"
	}
})

export const users = pgTable('communities', {
	uuid: uuid('uuid')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: varchar('name', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	password: varchar('password', { length: 256 }).notNull(),
	isPrivate: boolean('isPrivate').notNull().default(false),
	location: point("location").notNull(),
	createdAt: date('createdAt').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type PublicUserFields = Pick<User, "name" | "email" | "createdAt">
