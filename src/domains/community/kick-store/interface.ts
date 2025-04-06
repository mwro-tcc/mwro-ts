export interface IKickStore {
	execute(params: IKickStoreParams): Promise<void>
}

export type IKickStoreParams = {
	adminUuid: string;
	storeUuid: string;
	communityUuid: string;
}
