export interface IAssureHasActiveSubscriptionUseCase {
	execute(userUuid: string): Promise<void>
}
