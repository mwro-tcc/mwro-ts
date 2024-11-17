import { Product } from "../../../database/schema/products";
import { Review } from "../../../database/schema/review";
import { StoreWithLazyLoadedAssets } from "../../store/get-store-by-id/interface";

export type ProductFrontendRow = Product & {
	store: StoreWithLazyLoadedAssets;
	averageScore: string | null;
	myReview: Review | null;
}
