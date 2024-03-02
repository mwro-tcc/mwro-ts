import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeCreateCommunityUseCase } from ".";
import { CommunityCreationData } from "./types";
import { SignUpPayload, makeSignUpUseCase } from "../../user/sign-up";

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

describe("Community Creation UseCase test suite", () => {
    it("It should create a new community without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const signUpUseCase = makeSignUpUseCase(testDbInstance);
        const createCommunityUseCase = makeCreateCommunityUseCase(testDbInstance);

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
