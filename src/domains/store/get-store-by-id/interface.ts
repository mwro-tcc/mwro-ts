import { Community } from "../../../database/schema/communities";
import { Review } from "../../../database/schema/review";
import { Store } from "../../../database/schema/stores";
import { User } from "../../../database/schema/users";
import { WithIsFavorite } from "../../favorite";

export interface IGetStoreByUuid {
    execute(storeUuid: string, loggedUserUuid: string): Promise<StoreWithLazyLoadedAssets>
}

export type StoreWithLazyLoadedAssets = WithIsFavorite<Store & {
    community: Community | null;
    owner: User;
    averageScore: string | null;
    myReview: Review | null
}>;
