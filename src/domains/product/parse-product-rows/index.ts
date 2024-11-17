import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ProductFrontendRow } from "./types";
import { IReviewAdapter, makePgReviewAdapter } from "../../../infra/database/review";
import { Product } from "../../../database/schema/products";
import { IGetStoreByUuid } from "../../store/get-store-by-id/interface";
import { makeGetStoreByIdUseCase } from "../../store/get-store-by-id";

export function makeParseProductRowsUseCase(dbConnection: NodePgDatabase) {
	return new ParseProductRowsUseCase(
		makeGetStoreByIdUseCase(dbConnection),
		makePgReviewAdapter(dbConnection)
	)
}
class ParseProductRowsUseCase {
	constructor(
		private readonly getStoreByUuid: IGetStoreByUuid,
		private readonly reviewAdapter: IReviewAdapter,
	) { }
	async execute(products: Product[], loggedUserUuid: string): Promise<ProductFrontendRow[]> {
		const productIds = products.map(p => p.uuid)
		const reviewIdentifiers = products.map(p => {
			return { assetUuid: p.uuid, userUuid: loggedUserUuid }
		})
		const [averages, reviews] = await Promise.all([
			this.reviewAdapter.getAssetAverageScore(productIds),
			this.reviewAdapter.getManyByAssetAndUser(reviewIdentifiers)
		])

		const productRows: ProductFrontendRow[] = []
		for (let i = 0; i < products.length; i++) {
			const store = await this.getStoreByUuid.execute(productRows[i].storeUuid, loggedUserUuid)

			const product = products[i]
			const average = averages.find(a => a.assetUuid === product.uuid)
			const review = reviews.find(r => r.assetUuid === product.uuid)
			productRows.push({
				name: product.name,
				uuid: product.uuid,
				price: product.price,
				stock: product.stock,
				storeUuid: product.storeUuid,
				description: product.description,
				createdAt: product.createdAt,
				averageScore: average?.averageScore || null,
				myReview: review || null,
				store
			})
		}
		return productRows
	}
}
