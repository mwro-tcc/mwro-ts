import { NewStore, Store } from "../../../database/schema/stores";

export interface IStoreAdapter {
    create(data: NewStore): Promise<Store>;
    bulkCreate(payload: NewStore[]): Promise<void>;
    findByUuid(uuid: string): Promise<Store>;
    listFromCommunity(
        communityUuid: string,
        params: { limit: number; offset: number },
    ): Promise<Store[]>;
    update(uuid: string, data: Partial<NewStore>): Promise<Store>;
    delete(uuid: string): Promise<void>;
    listCreatedStores(userUuid: string, params: { limit: number; offset: number }): Promise<Store[]>;
    listFavoriteStores(userUuid: string, params: { limit: number; offset: number }): Promise<Store[]>;
    unnassociateFromCommunity(communityUuid: string): Promise<void>;
    searchByName(
        name: string,
        params: { limit: number; offset: number },
    ): Promise<Store[]>
    listFavoriteStores(
        userUuid: string,
        params: { limit: number; offset: number },
    ): Promise<Store[]>
}
