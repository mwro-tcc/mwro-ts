import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Store } from "../../../database/schema/stores";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { databaseConnectionPool } from "../../../database";
import { Community } from "../../../database/schema/communities";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { User } from "../../../database/schema/users";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makePgUserAdapter } from "../../../infra/database/user";
import { WithIsFavorite, makeGetAssetFavoriteStatus } from "../../favorite";
import { IGetFavoriteStatus } from "../../favorite/interface";

class GetStoreById {
    constructor(
        private readonly getFavoriteStatus: IGetFavoriteStatus,
        private readonly storeAdapter: IStoreAdapter,
        private readonly communityAdapter: ICommunityAdapter,
        private readonly userAdapter: IUserAdapter
    ) { }

    async execute(storeUuid: string, loggedUserUuid: string): Promise<StoreWithLazyLoadedAssets> {
        const baseStore = await this.storeAdapter.findByUuid(storeUuid);

        const store = await this.getFavoriteStatus.execute([baseStore], loggedUserUuid).then(stores => stores[0]);

        let community: Community | null = null;
        if (baseStore.communityUuid) {
            community = await this.communityAdapter.findByUuid(baseStore.communityUuid);
        }

        const owner = await this.userAdapter.findByUuid(baseStore.userUuid)

        return { ...store, owner, community };
    }
}

type StoreWithLazyLoadedAssets = WithIsFavorite<Store & {
    community: Community | null;
    owner: User;
}>;

export function makeGetStoreByIdUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new GetStoreById(
        makeGetAssetFavoriteStatus(db), makePgStoreAdapter(db), makePgCommunityAdapter(db), makePgUserAdapter(db)
    );
}
