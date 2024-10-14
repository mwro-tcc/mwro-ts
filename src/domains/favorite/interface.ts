import { WithIsFavorite } from ".";
import { AnyWithUuid } from "../../types/AnyWithUuid";

export interface IGetFavoriteStatus {
	execute<T extends AnyWithUuid>(assets: T[], userUuid: string): Promise<WithIsFavorite<T>[]>
}
