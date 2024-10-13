import { IFavoriteAdapter, makePgFavoriteAdapter } from "../../infra/database/favorites";

export function makeGetAssetFavoriteStatus() {
	return new GetAssetFavoriteStatus(
		makePgFavoriteAdapter()
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

type AnyWithUuid = {
	uuid: string
}

type WithIsFavorite<T> = T & { isFavorite: boolean }
