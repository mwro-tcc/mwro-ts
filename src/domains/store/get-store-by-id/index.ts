import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NewStore, Store } from "../../../database/schema/stores";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { databaseConnectionPool } from "../../../database";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { IProductAdapter } from "../../../infra/database/product/interface";
import { makePgProductAdapter } from "../../../infra/database/product";
import { Community } from "../../../database/schema/communities";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgCommunityAdapter } from "../../../infra/database/community";

class GetStoreById {
    constructor(
        private readonly storeAdapter: IStoreAdapter,
        private readonly communityAdapter: ICommunityAdapter,
    ) {}

    async execute(storeUuid: string): Promise<StoreWithLazyLoadedAssets> {
        const baseStore = await this.storeAdapter.findByUuid(storeUuid);

        const store: StoreWithLazyLoadedAssets = {
            ...baseStore,
            community: null,
        };

        if (baseStore.communityUuid) {
            const community = await this.communityAdapter.findByUuid(baseStore.communityUuid);

            store.community = community;
        }

        return store;
    }
}

type StoreWithLazyLoadedAssets = Store & {
    community: Community | null;
};

export function makeGetStoreByIdUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new GetStoreById(makePgStoreAdapter(db), makePgCommunityAdapter(db));
}
