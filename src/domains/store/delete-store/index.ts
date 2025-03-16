import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NewStore, Store } from "../../../database/schema/stores";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { databaseConnectionPool } from "../../../database";
import { IDeleteStoreUseCase } from "./interface";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { IProductAdapter } from "../../../infra/database/product/interface";
import { makePgProductAdapter } from "../../../infra/database/product";
import { ICommunityRequestsAdapter } from "../../../infra/database/community-requests/interface";
import { makePgCommunityRequestsAdapter } from "../../../infra/database/community-requests";

class DeleteStoreUseCase implements IDeleteStoreUseCase {
    constructor(
        private readonly storeAdapter: IStoreAdapter,
        private readonly productAdapter: IProductAdapter,
        private readonly communityRequestsAdapter: ICommunityRequestsAdapter,
    ) {}

    async execute(storeUuid: string, userUuidMakingRequest: string): Promise<void> {
        const currentStore = await this.storeAdapter.findByUuid(storeUuid);
        if (currentStore.userUuid !== userUuidMakingRequest)
            throw new StatusError(400, ErrorMessages.userIsNotStoreOwner);

        await this.productAdapter.deleteAllFromStore(storeUuid);
        await this.communityRequestsAdapter.deleteAllFromStore(storeUuid);

        await this.storeAdapter.delete(storeUuid);
    }
}

export function makeDeleteStoreUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new DeleteStoreUseCase(
        makePgStoreAdapter(db),
        makePgProductAdapter(db),
        makePgCommunityRequestsAdapter(db),
    );
}
