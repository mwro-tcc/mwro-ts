import { Product } from "../../../database/schema/products";
import { Review } from "../../../database/schema/review";

export type ProductFrontendRow = Product & {
	averageScore: string | null;
	myReview: Review | null;
}
