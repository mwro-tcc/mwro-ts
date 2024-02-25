import { beforeEach, describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeCreateCommunityUseCase } from ".";
import { SignUpPayload, makeSignUpUseCase } from "../sign-up";
import { CommunityCreationData } from "./types";

const testDatabaseReseter = new TestDatabaseReseter();
const signUpUseCase = makeSignUpUseCase();

const createCommunityUseCase = makeCreateCommunityUseCase();

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

describe("Community Creation UseCase test suite", () => {
    beforeEach(async () => {
        await testDatabaseReseter.truncateAllTables();
    });

    it("It should create a new community without errors", async () => {
        const { user, token: _ } = await signUpUseCase.execute(newUserPayload);

        const { creator, community } = await createCommunityUseCase.execute({
            creatorUserUuid: user.uuid,
            communityData,
        });

        expect(community).toBeDefined();
        expect(creator).toBeDefined();
        expect(creator.userUuid).toBe(user.uuid);
    });
});
