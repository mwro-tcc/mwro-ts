import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeSignUpUseCase } from "../../user/sign-up";
import { makeCreateCommunityUseCase } from "../../community/create-community";

const testDatabaseReseter = new TestDatabaseReseter();

const userCreationPayload = {
    name: "test",
    email: "test",
    password: "test",
};

describe("Community Creation UseCase test suite", () => {
    it("It should create a new community without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const signUpUseCase = makeSignUpUseCase(testDbInstance);
        const createCommunityUseCase = makeCreateCommunityUseCase(testDbInstance);

        const { user, token: _ } = await signUpUseCase.execute(userCreationPayload);
        // const { creator, community } = await createCommunityUseCase.execute({
        //     creatorUserUuid: user.uuid,
        //     communityData,
        // });
    });
});
