import { beforeEach, describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { SignUpPayload, makeSignUpUseCase } from "../../user/sign-up";
import { makeCreateCommunityUseCase } from "../create-community";
import { CommunityCreationData } from "../create-community/types";
import { makeDeleteCommunityUseCase } from ".";
import { makeCommunityAdapter } from "../../../infra/database/community";
import { makeCommunityAdminAdapter } from "../../../infra/database/community-admin";

const testDatabaseReseter = new TestDatabaseReseter();

const newUserPayload: SignUpPayload = {
    name: "Test user",
    email: "user@test.com",
    password: "1234567910ab@",
};

const communityData: CommunityCreationData = {
    latitude: 100,
    longitude: 50,
    name: "New Community",
    isPrivate: false,
    description: "Testando",
};

describe("Community Deletion UseCase test suite", () => {
    it("It should delete a community without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const signUpUseCase = makeSignUpUseCase(testDbInstance);
        const createCommunityUseCase = makeCreateCommunityUseCase(testDbInstance);
        const deleteCommunityUseCase = makeDeleteCommunityUseCase(testDbInstance);

        const communityAdapter = makeCommunityAdapter(testDbInstance);
        const communityAdminAdapter = makeCommunityAdminAdapter(testDbInstance);

        const { user, token: _ } = await signUpUseCase.execute(newUserPayload);
        const userUuid = user.uuid;

        const { community } = await createCommunityUseCase.execute({
            creatorUserUuid: userUuid,
            communityData,
        });

        await deleteCommunityUseCase.execute(userUuid, community.uuid);

        const [communityAfterDeletion, communityAdmin] = await Promise.all([
            communityAdapter.findByUuid(community.uuid),
            communityAdminAdapter.findByUserAndCommunityUuid(userUuid, community.uuid),
        ]);

        expect(communityAfterDeletion).toBeUndefined();
        expect(communityAdmin).toBeUndefined();
    });

    it.skip("It throw an error when trying to delete a community that does not exists");
    it.skip("It throw an error when a invalid userUuid tries to delete a community");
    it.skip("It throw an error when someone who is not an admin tries to delete a community");
    it.skip("It throw an error when someone who is not the creator tries to delete a community");
});
