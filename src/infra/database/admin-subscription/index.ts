import { eq, desc, and, isNull, gte, sql, lte } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";
import { AdminSubscription, adminSubscriptions, NewAdminSubscription } from "../../../database/schema/admin-subscriptions";

class PgAdminSubscriptionsAdapter {
	constructor(private readonly db: NodePgDatabase) { }
	async create(input: NewAdminSubscription): Promise<AdminSubscription> {
		const data = await this.db.insert(adminSubscriptions).values(input).returning();
		return data[0];
	}

	async bulkCreate(payload: NewAdminSubscription[]): Promise<void> {
		await this.db.insert(adminSubscriptions).values(payload).returning();
	}

	async update(uuid: string, input: Partial<NewAdminSubscription>): Promise<AdminSubscription> {
		const data = await this.db
			.update(adminSubscriptions)
			.set(input)
			.where(eq(adminSubscriptions.uuid, uuid))
			.returning();
		return data[0];
	}

	async updateByObjectId(objectId: string, input: Partial<NewAdminSubscription>): Promise<AdminSubscription> {
		const data = await this.db
			.update(adminSubscriptions)
			.set(input)
			.where(eq(adminSubscriptions.objectId, objectId))
			.returning();
		return data[0];
	}

	async getUserActiveSubscription(userUuid: string): Promise<AdminSubscription | null> {
		const data = await this.db
			.select()
			.from(adminSubscriptions)
			.where(and(
				eq(adminSubscriptions.userUuid, userUuid),
				isNull(adminSubscriptions.cancelationEventUuid),
				lte(adminSubscriptions.startsAt, sql`NOW()`),
				gte(adminSubscriptions.expiresAt, sql`NOW()`)
			))
			.orderBy(desc(adminSubscriptions.createdAt));
		return data[0];
	}

	async findByUuid(uuid: string): Promise<AdminSubscription> {
		const data = await this.db.select().from(adminSubscriptions).where(eq(adminSubscriptions.uuid, uuid));
		return data[0];
	}

	async delete(uuid: string): Promise<void> {
		await this.db.delete(adminSubscriptions).where(eq(adminSubscriptions.uuid, uuid));
	}


	async list(params: { limit: number; offset: number }) {
		return await this.db
			.select()
			.from(adminSubscriptions)
			.orderBy(desc(adminSubscriptions.createdAt))
			.limit(params.limit)
			.offset(params.offset);
	}
}

export function makePgAdminSubscriptionsAdapter(db: NodePgDatabase = databaseConnectionPool) {
	return new PgAdminSubscriptionsAdapter(db);
}