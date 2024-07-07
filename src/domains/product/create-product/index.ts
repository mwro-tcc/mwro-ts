import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IProductAdapter } from "../../../infra/database/product/interface";
import { makeProductAdapter } from "../../../infra/database/product";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makePgUserAdapter } from "../../../infra/database/user";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { IStoreAdapter } from "../../../infra/database/store/interface";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { ICreateProductUseCase } from "./interface";
import { CreateProductUseCaseParams } from "./types";

class CreateProductUseCase implements ICreateProductUseCase {
    constructor(
        private readonly productAdapter: IProductAdapter,
        private readonly userAdapter: IUserAdapter,
        private readonly storeAdapter: IStoreAdapter,
    ) {}

    async execute(payload: CreateProductUseCaseParams) {
        const { product, userUuidRequestingCreation } = payload;

        const [user, store] = await Promise.all([
            this.userAdapter.findByUuid(userUuidRequestingCreation),
            this.storeAdapter.findByUuid(product.storeUuid),
        ]);

        if (!user) throw new StatusError(404, ErrorMessages.userNotFound);
        if (!store) throw new StatusError(404, ErrorMessages.storeNotFound);

        if (store.userUuid !== user.uuid)
            throw new StatusError(403, ErrorMessages.userIsNotStoreOwner);

        return await this.productAdapter.create(product);
    }
}

export function makeCreateProductUseCase(db: NodePgDatabase) {
    return new CreateProductUseCase(
        makeProductAdapter(db),
        makePgUserAdapter(db),
        makePgStoreAdapter(db),
    );
}
