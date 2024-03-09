import { NewStore, Store } from "../../../database/schema/stores";

export interface IStoreAdapter {
    create(data: NewStore): Promise<Store>;
}
