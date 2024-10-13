import { and, eq, getOrderByOperators } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Favorite, NewFavorite, favorites } from "../../../database/schema/favorites";
import { databaseConnectionPool } from "../../../database";

export interface IFavoriteAdapter {
	create(input: NewFavorite): Promise<Favorite>
	bulkCreate(payload: NewFavorite[]): Promise<void>
	update(uuid: string, input: Partial<NewFavorite>): Promise<Favorite>
	findByUuid(uuid: string): Promise<Favorite>
	delete(uuid: string): Promise<void>
	getFavoriteAssetUuids(userUuid: string): Promise<string[]>
	deleteAllByAssetAndUser(assetUuid: string, userUuid: string): Promise<void>
	findByAssetUuid(assetUuid: string): Promise<Favorite>
	updateByAssetUuid(assetUuid: string, input: Partial<NewFavorite>): Promise<Favorite>
}

class PgFavoriteAdapter implements IFavoriteAdapter {
	constructor(private readonly db: NodePgDatabase) { }
	async create(input: NewFavorite): Promise<Favorite> {
		return await this.db.transaction(async (tx) => {
			await tx.delete(favorites).where(eq(favorites.assetUuid, input.assetUuid))
			const data = await tx.insert(favorites).values(input).returning();

			return data[0];
		})
	}

	async bulkCreate(payload: NewFavorite[]): Promise<void> {
		await this.db.insert(favorites).values(payload).returning();
	}

	async update(uuid: string, input: Partial<NewFavorite>): Promise<Favorite> {
		const data = await this.db
			.update(favorites)
			.set(input)
			.where(eq(favorites.uuid, uuid))
			.returning();
		return data[0];
	}

	async findByUuid(uuid: string): Promise<Favorite> {
		const data = await this.db.select().from(favorites).where(eq(favorites.uuid, uuid));
		return data[0];
	}

	async delete(uuid: string): Promise<void> {
		await this.db.delete(favorites).where(eq(favorites.uuid, uuid));
	}

	async getFavoriteAssetUuids(userUuid: string): Promise<string[]> {
		const assetUuids = await this.db.select({
			uuid: favorites.uuid,
			assetUuid: favorites.assetUuid
		}).from(favorites).where(
			eq(favorites.userUuid, userUuid)
		).then(data => data.map(d => d.assetUuid));

		return assetUuids
	}

	async deleteAllByAssetAndUser(assetUuid: string, userUuid: string): Promise<void> {
		await this.db.delete(favorites).where(
			and(
				eq(favorites.assetUuid, assetUuid),
				eq(favorites.userUuid, userUuid)
			)

		);
	}

	async findByAssetUuid(assetUuid: string): Promise<Favorite> {
		const data = await this.db.select().from(favorites).where(eq(favorites.assetUuid, assetUuid)).orderBy(getOrderByOperators().desc(favorites.createdAt));
		return data[0];
	}




	async updateByAssetUuid(assetUuid: string, input: Partial<NewFavorite>): Promise<Favorite> {
		const data = await this.db
			.update(favorites)
			.set(input)
			.where(eq(favorites.assetUuid, assetUuid))
			.returning();
		return data[0];
	}
}

export function makePgFavoriteAdapter(db: NodePgDatabase = databaseConnectionPool) {
	return new PgFavoriteAdapter(db);
}
