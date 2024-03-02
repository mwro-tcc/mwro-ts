import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { SignUpPayload, makeSignUpUseCase } from "../../user/sign-up";
import { makeCreateCommunityUseCase } from "../create-community";
import { CommunityCreationData } from "../create-community/types";
import { makeUpdateCommunityUseCase } from ".";
import { makeCommunityAdapter } from "../../../infra/database/community";

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

describe("Community Update UseCase test suite", () => {
    it("It should update a community without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const signUpUseCase = makeSignUpUseCase(testDbInstance);
        const createCommunityUseCase = makeCreateCommunityUseCase(testDbInstance);
        const updateCommunityUseCase = makeUpdateCommunityUseCase(testDbInstance);
        const communityAdapter = makeCommunityAdapter(testDbInstance);

        const { user, token: _ } = await signUpUseCase.execute(newUserPayload);
        const { community } = await createCommunityUseCase.execute({
            creatorUserUuid: user.uuid,
            communityData,
        });

        const communityBeforeUpdate = await communityAdapter.findByUuid(community.uuid);

        const updatedCommunity = await updateCommunityUseCase.execute(user.uuid, community.uuid, {
            name: "Updated Name",
        });

        expect(communityBeforeUpdate.name).not.toBe(updatedCommunity.name);
    });

    it.skip("It throw an error when trying to update a community that does not exists");
    it.skip("It throw an error when a invalid userUuid tries to update a community");
    it.skip("It throw an error when someone who is not an admin tries to update a community");
    it.skip("It throw an error when someone who is not the creator tries to update a community");
});
