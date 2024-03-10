import { NewStore, Store } from "../../../database/schema/stores";

export interface ICreateStoreUseCase {
    execute(params: NewStore): Promise<Store>;
}
