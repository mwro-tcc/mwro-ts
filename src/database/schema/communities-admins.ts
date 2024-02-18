
import { sql } from 'drizzle-orm';
import { boolean, date, pgTable, uuid, varchar, real } from 'drizzle-orm/pg-core';
import { users } from './users';
import { communities } from './communities';

export const communitiesAdmins = pgTable('communitiesAdmins', {
	uuid: uuid('uuid')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	userUuid: uuid('userUuid').notNull().references(() => users.uuid),
	communityUuid: uuid('communityUuid').notNull().references(() => communities.uuid),
	isCreator: boolean('isCreator').notNull().default(false),
	createdAt: date('createdAt').defaultNow().notNull(),
});

export type CommunityAdmin = typeof communitiesAdmins.$inferSelect;
export type NewCommunityAdmin = typeof communitiesAdmins.$inferInsert;
