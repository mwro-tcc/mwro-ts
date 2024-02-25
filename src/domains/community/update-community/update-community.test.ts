import { beforeEach, describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { SignUpPayload, makeSignUpUseCase } from "../../user/sign-up";
import { makeCreateCommunityUseCase } from "../create-community";
import { CommunityCreationData } from "../create-community/types";
import { makeUpdateCommunityUseCase } from ".";
import { makeCommunityAdapter } from "../../../infra/database/community";

const testDatabaseReseter = new TestDatabaseReseter();
const signUpUseCase = makeSignUpUseCase();
const createCommunityUseCase = makeCreateCommunityUseCase();
const communityAdapter = makeCommunityAdapter();

const updateCommunityUseCase = makeUpdateCommunityUseCase();

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

let communityUuid: string;
let userUuid: string;
describe("Community Update UseCase test suite", () => {
    beforeEach(async () => {
        await testDatabaseReseter.truncateAllTables();
        const { user, token: _ } = await signUpUseCase.execute(newUserPayload);
        const { community } = await createCommunityUseCase.execute({
            creatorUserUuid: user.uuid,
            communityData,
        });
        userUuid = user.uuid;
        communityUuid = community.uuid;
    });

    it("It should update a community without errors", async () => {
        const communityBeforeUpdate = await communityAdapter.findByUuid(communityUuid);

        const community = await updateCommunityUseCase.execute(userUuid, communityUuid, {
            name: "Updated Name",
        });

        expect(communityBeforeUpdate.name).not.toBe(community.name);
        expect(community.name).toBe(community.name);
    });

    it.skip("It throw an error when trying to update a community that does not exists");
    it.skip("It throw an error when a invalid userUuid tries to update a community");
    it.skip("It throw an error when someone who is not an admin tries to update a community");
    it.skip("It throw an error when someone who is not the creator tries to update a community");
});
