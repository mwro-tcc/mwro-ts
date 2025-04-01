import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeCreateCommunityUseCase } from ".";
import { CommunityCreationData } from "./types";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";

const testDatabaseReseter = new TestDatabaseReseter();

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
        const createCommunityUseCase = makeCreateCommunityUseCase(testDbInstance);

        const { creator, community } = await createCommunityUseCase.execute({
            creatorUserUuid: TestDatabaseCommonValues.user1.uuid,
            communityData,
        });

        expect(community).toBeDefined();
        expect(creator).toBeDefined();
        expect(creator.userUuid).toBe(TestDatabaseCommonValues.user1.uuid);
    });

    it("It should block the creation of the community", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const createCommunityUseCase = makeCreateCommunityUseCase(testDbInstance);

        await expect(createCommunityUseCase.execute({
            creatorUserUuid: TestDatabaseCommonValues.user2.uuid,
            communityData,
        })).rejects.toThrow(new StatusError(400, ErrorMessages.userDontHaveSubscription));
    });
});
