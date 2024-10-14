import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IFavoriteAdapter, makePgFavoriteAdapter } from "../../infra/database/favorites";
import { AnyWithUuid } from "../../types/AnyWithUuid";

export function makeGetAssetFavoriteStatus(db: NodePgDatabase) {
	return new GetAssetFavoriteStatus(
		makePgFavoriteAdapter(db)
	)
}

class GetAssetFavoriteStatus {
	constructor(
		private readonly favoriteAdapter: IFavoriteAdapter
	) { }
	async execute<T extends AnyWithUuid>(assets: T[], userUuid: string): Promise<WithIsFavorite<T>[]> {
		const favoriteAssetUuids = await this.favoriteAdapter.getFavoriteAssetUuids(userUuid)

		const assetsToReturn: WithIsFavorite<T>[] = []
		for (const asset of assets) {
			const isFavorite = !!favoriteAssetUuids.find(u => u === asset.uuid)
			assetsToReturn.push({ ...asset, isFavorite })
		}
		return assetsToReturn
	}

}


export type WithIsFavorite<T> = T & { isFavorite: boolean }
