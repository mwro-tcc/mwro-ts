export interface IDeleteCommunityUseCase {
    execute(userUuidRequestingDeletion: string, communityUuid: string): Promise<void>;
}
