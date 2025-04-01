import { AdminSubscription, NewAdminSubscription } from "../../../database/schema/admin-subscriptions";

export interface IAdminSubscriptionAdapter {
	create(input: NewAdminSubscription): Promise<AdminSubscription>
	bulkCreate(payload: NewAdminSubscription[]): Promise<void>
	update(uuid: string, input: Partial<NewAdminSubscription>): Promise<AdminSubscription>
	updateByObjectId(objectId: string, input: Partial<NewAdminSubscription>): Promise<AdminSubscription>
	createOrUpdateByObjectId(objectId: string, input: Partial<NewAdminSubscription>): Promise<void>
	getUserActiveSubscription(userUuid: string): Promise<AdminSubscription | null>
	findByUuid(uuid: string): Promise<AdminSubscription>
	findByObjectId(objectId: string): Promise<AdminSubscription>
	delete(uuid: string): Promise<void>
	list(params: { limit: number; offset: number }): Promise<AdminSubscription[]>

}
