import { eq, desc } from "drizzle-orm";
import { StripeEvent, NewStripeEvent, stripeEvents } from "../../../database/schema/stripe-events";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";

class PgStripeEvent {
	constructor(private readonly db: NodePgDatabase) { }
	async create(input: NewStripeEvent): Promise<StripeEvent> {
		const data = await this.db.insert(stripeEvents).values(input).returning();
		return data[0];
	}

	async bulkCreate(payload: NewStripeEvent[]): Promise<void> {
		await this.db.insert(stripeEvents).values(payload).returning();
	}

	async update(uuid: string, input: Partial<NewStripeEvent>): Promise<StripeEvent> {
		const data = await this.db
			.update(stripeEvents)
			.set(input)
			.where(eq(stripeEvents.uuid, uuid))
			.returning();
		return data[0];
	}

	async findByUuid(uuid: string): Promise<StripeEvent> {
		const data = await this.db.select().from(stripeEvents).where(eq(stripeEvents.uuid, uuid));
		return data[0];
	}

	async delete(uuid: string): Promise<void> {
		await this.db.delete(stripeEvents).where(eq(stripeEvents.uuid, uuid));
	}

	async list(params: { limit: number; offset: number }) {
		return await this.db
			.select()
			.from(stripeEvents)
			.orderBy(desc(stripeEvents.createdAt))
			.limit(params.limit)
			.offset(params.offset);
	}

}

export function makePgStripeEventAdapter(db: NodePgDatabase = databaseConnectionPool) {
	return new PgStripeEvent(db);
}
