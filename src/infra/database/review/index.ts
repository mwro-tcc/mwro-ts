import { and, avg, eq, getOrderByOperators } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";
import { NewReview, Review, reviews } from "../../../database/schema/review";

export interface IReviewAdapter {
	create(input: NewReview): Promise<Review>
	bulkCreate(payload: NewReview[]): Promise<void>
	update(uuid: string, input: Partial<NewReview>): Promise<Review>
	findByUuid(uuid: string): Promise<Review>
	delete(uuid: string): Promise<void>
	getReviewAssetUuids(userUuid: string): Promise<string[]>
	deleteAllByAssetAndUser(assetUuid: string, userUuid: string): Promise<void>
	getByAssetAndUser(assetUuid: string, userUuid: string): Promise<Review>
	getAssetAverageScore(assetUuid: string): Promise<number>
}

class PgReviewAdapter implements IReviewAdapter {
	constructor(private readonly db: NodePgDatabase) { }
	async create(input: NewReview): Promise<Review> {
		return await this.db.transaction(async (tx) => {
			await tx.delete(reviews).where(eq(reviews.assetUuid, input.assetUuid))
			const data = await tx.insert(reviews).values(input).returning();

			return data[0];
		})
	}

	async bulkCreate(payload: NewReview[]): Promise<void> {
		await this.db.insert(reviews).values(payload).returning();
	}

	async update(uuid: string, input: Partial<NewReview>): Promise<Review> {
		const data = await this.db
			.update(reviews)
			.set(input)
			.where(eq(reviews.uuid, uuid))
			.returning();
		return data[0];
	}

	async findByUuid(uuid: string): Promise<Review> {
		const data = await this.db.select().from(reviews).where(eq(reviews.uuid, uuid));
		return data[0];
	}

	async delete(uuid: string): Promise<void> {
		await this.db.delete(reviews).where(eq(reviews.uuid, uuid));
	}

	async getReviewAssetUuids(userUuid: string): Promise<string[]> {
		const assetUuids = await this.db.select({
			uuid: reviews.uuid,
			assetUuid: reviews.assetUuid
		}).from(reviews).where(
			eq(reviews.userUuid, userUuid)
		).then(data => data.map(d => d.assetUuid));

		return assetUuids
	}

	async deleteAllByAssetAndUser(assetUuid: string, userUuid: string): Promise<void> {
		await this.db.delete(reviews).where(
			and(
				eq(reviews.assetUuid, assetUuid),
				eq(reviews.userUuid, userUuid)
			)

		);
	}

	async getByAssetAndUser(assetUuid: string, userUuid: string): Promise<Review> {
		return await this.db.select().from(reviews).where(
			and(
				eq(reviews.assetUuid, assetUuid),
				eq(reviews.userUuid, userUuid)
			)

		).then(data => data[0]);

	}

	async getAssetAverageScore(assetUuid: string): Promise<number> {
		return await this.db.select({ average: avg(reviews.score) }).from(reviews).where(
			eq(reviews.assetUuid, assetUuid),

		).then(data => {
			if (!data) return 0
			return Number(data[0].average)
		});

	}
}

export function makePgReviewAdapter(db: NodePgDatabase = databaseConnectionPool) {
	return new PgReviewAdapter(db);
}
