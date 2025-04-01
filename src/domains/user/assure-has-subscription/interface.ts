export interface IAssureIsAdminUseCase {
	execute(userUuid: string): Promise<void>
}
