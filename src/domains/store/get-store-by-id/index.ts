import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { databaseConnectionPool } from "../../../database";
import { Community } from "../../../database/schema/communities";
import { ICommunityAdapter } from "../../../infra/database/community/interface";
import { makePgCommunityAdapter } from "../../../infra/database/community";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makePgUserAdapter } from "../../../infra/database/user";
import { makeGetAssetFavoriteStatus } from "../../favorite";
import { IGetFavoriteStatus } from "../../favorite/interface";
import { IReviewAdapter, makePgReviewAdapter } from "../../../infra/database/review";
import { IGetStoreByUuid, StoreWithLazyLoadedAssets } from "./interface";
import { User } from "../../../database/schema/users";
import { CommunityWithLazyLoadedAssets, IGetCommunityByIdUseCase, makeGetCommunityByIdUseCase } from "../../community/get-by-id";

class GetStoreById implements IGetStoreByUuid {
    constructor(
        private readonly getFavoriteStatus: IGetFavoriteStatus,
        private readonly getCommunity: IGetCommunityByIdUseCase,
        private readonly storeAdapter: IStoreAdapter,
        private readonly userAdapter: IUserAdapter,
        private readonly reviewAdapter: IReviewAdapter,
    ) { }

    async execute(storeUuid: string, loggedUserUuid: string): Promise<StoreWithLazyLoadedAssets> {
        const baseStore = await this.storeAdapter.findByUuid(storeUuid);
        const store = await this.getFavoriteStatus.execute([baseStore], loggedUserUuid).then(stores => stores[0]);

        const [averageScore, myReview] = await Promise.all([
            this.reviewAdapter.getAssetAverageScore([storeUuid]).then(scores => scores[0]?.averageScore),
            this.reviewAdapter.getManyByAssetAndUser([{ assetUuid: storeUuid, userUuid: loggedUserUuid }]).then(reviews => reviews[0])


        ])

        let community: CommunityWithLazyLoadedAssets | null = null
        if (baseStore.communityUuid) {
            community = await this.getCommunity.execute(baseStore.communityUuid, loggedUserUuid)
        }

        const owner = await this.userAdapter.findByUuid(baseStore.userUuid)

        return { ...store, owner, community, averageScore: averageScore || null, myReview: myReview || null };
    }
}


export function makeGetStoreByIdUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new GetStoreById(
        makeGetAssetFavoriteStatus(db),
        makeGetCommunityByIdUseCase(db),
        makePgStoreAdapter(db),
        makePgUserAdapter(db),
        makePgReviewAdapter(db)
    );
}
