import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NewStore, Store } from "../../../database/schema/stores";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { databaseConnectionPool } from "../../../database";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { IProductAdapter } from "../../../infra/database/product/interface";
import { Community } from "../../../database/schema/communities";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { User } from "../../../database/schema/users";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makePgUserAdapter } from "../../../infra/database/user";

class GetStoreById {
    constructor(
        private readonly storeAdapter: IStoreAdapter,
        private readonly communityAdapter: ICommunityAdapter,
        private readonly userAdapter: IUserAdapter
    ) { }

    async execute(storeUuid: string): Promise<StoreWithLazyLoadedAssets> {
        const baseStore = await this.storeAdapter.findByUuid(storeUuid);


        let community: Community | null = null;
        if (baseStore.communityUuid) {
            community = await this.communityAdapter.findByUuid(baseStore.communityUuid);
        }

        const owner = await this.userAdapter.findByUuid(baseStore.userUuid)
        const store: StoreWithLazyLoadedAssets = {
            ...baseStore,
            community,
            owner
        };

        return store;
    }
}

type StoreWithLazyLoadedAssets = Store & {
    community: Community | null;
    owner: User;
};

export function makeGetStoreByIdUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new GetStoreById(makePgStoreAdapter(db), makePgCommunityAdapter(db), makePgUserAdapter(db));
}
