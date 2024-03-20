import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IProductAdapter } from "../../../infra/database/product/interface";
import { makeProductAdapter } from "../../../infra/database/product";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makeUserAdapter } from "../../../infra/database/user";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { makeStoreAdapter } from "../../../infra/database/store";
import { NewProduct, Product } from "../../../database/schema/products";

class UpdateProductUsecase {
    constructor(
        private readonly productAdapter: IProductAdapter,
        private readonly userAdapter: IUserAdapter,
        private readonly storeAdapter: IStoreAdapter,
    ) {}

    async execute(userUuidMakingRequest: string, productUuid: string, data: Partial<NewProduct>) {
        const [user, product] = await Promise.all([
            this.userAdapter.findByUuid(userUuidMakingRequest),
            this.productAdapter.findByUuid(productUuid),
        ]);

        if (!user) throw new StatusError(404, ErrorMessages.userNotFound);
        if (!product) throw new StatusError(404, ErrorMessages.storeNotFound);

        const store = await this.storeAdapter.findByUuid(product.storeUuid);

        if (store.userUuid !== user.uuid)
            throw new StatusError(403, ErrorMessages.userIsNotStoreOwner);

        return await this.productAdapter.update(product.uuid, data);
    }
}

export function makeUpdateProductUseCase(db: NodePgDatabase) {
    return new UpdateProductUsecase(
        makeProductAdapter(db),
        makeUserAdapter(db),
        makeStoreAdapter(db),
    );
}
