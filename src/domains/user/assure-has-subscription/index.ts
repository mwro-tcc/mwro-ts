import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { makePgAdminSubscriptionsAdapter } from "../../../infra/database/admin-subscription";
import { IAdminSubscriptionAdapter } from "../../../infra/database/admin-subscription/interface";
import { IAssureHasActiveSubscriptionUseCase, } from "./interface";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";

class AssureHasSubscriptionUseCase implements IAssureHasActiveSubscriptionUseCase {
	constructor(
		private readonly adminSubscriptionAdapter: IAdminSubscriptionAdapter
	) { }
	async execute(userUuid: string): Promise<void> {
		const activeSubscription = await this.adminSubscriptionAdapter.getUserActiveSubscription(userUuid)
		if (!activeSubscription) throw new StatusError(400, ErrorMessages.userDontHaveSubscription)
	}
}


export function makeAssureHasSubscriptionUseCase(db: NodePgDatabase) {
	return new AssureHasSubscriptionUseCase(
		makePgAdminSubscriptionsAdapter(db)
	)
}
