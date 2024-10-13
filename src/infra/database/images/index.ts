
import { eq, getOrderByOperators } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Image, NewImage, images } from "../../../database/schema/images";
import { databaseConnectionPool } from "../../../database";

class PgImageAdapter {
	constructor(private readonly db: NodePgDatabase) { }
	async create(input: NewImage): Promise<Image> {
		return await this.db.transaction(async (tx) => {
			await tx.delete(images).where(eq(images.assetUuid, input.assetUuid))
			const data = await tx.insert(images).values(input).returning();

			return data[0];
		})
	}

	async bulkCreate(payload: NewImage[]): Promise<void> {
		await this.db.insert(images).values(payload).returning();
	}

	async update(uuid: string, input: Partial<NewImage>): Promise<Image> {
		const data = await this.db
			.update(images)
			.set(input)
			.where(eq(images.uuid, uuid))
			.returning();
		return data[0];
	}

	async findByUuid(uuid: string): Promise<Image> {
		const data = await this.db.select().from(images).where(eq(images.uuid, uuid));
		return data[0];
	}

	async delete(uuid: string): Promise<void> {
		await this.db.delete(images).where(eq(images.uuid, uuid));
	}

	async findByAssetUuid(assetUuid: string): Promise<Image> {
		const data = await this.db.select().from(images).where(eq(images.assetUuid, assetUuid)).orderBy(getOrderByOperators().desc(images.createdAt));
		return data[0];
	}


	async updateByAssetUuid(assetUuid: string, input: Partial<NewImage>): Promise<Image> {
		const data = await this.db
			.update(images)
			.set(input)
			.where(eq(images.assetUuid, assetUuid))
			.returning();
		return data[0];
	}
}

export function makePgImageAdapter(db: NodePgDatabase = databaseConnectionPool) {
	return new PgImageAdapter(db);
}
