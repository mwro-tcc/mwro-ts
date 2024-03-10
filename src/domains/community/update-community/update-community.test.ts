import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeUpdateCommunityUseCase } from ".";
import { makeCommunityAdapter } from "../../../infra/database/community";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";

const testDatabaseReseter = new TestDatabaseReseter();

describe("Community Update UseCase test suite", () => {
    it("It should update a community without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const updateCommunityUseCase = makeUpdateCommunityUseCase(testDbInstance);
        const communityAdapter = makeCommunityAdapter(testDbInstance);

        const communityBeforeUpdate = await communityAdapter.findByUuid(
            TestDatabaseCommonValues.community1.uuid,
        );

        const updatedCommunity = await updateCommunityUseCase.execute(
            TestDatabaseCommonValues.community1.admin1.userUuid,
            TestDatabaseCommonValues.community1.uuid,
            {
                name: "Updated Name",
            },
        );

        expect(communityBeforeUpdate.name).not.toBe(updatedCommunity.name);
    });

    it.skip("It throw an error when trying to update a community that does not exists");
    it.skip("It throw an error when a invalid userUuid tries to update a community");
    it.skip("It throw an error when someone who is not an admin tries to update a community");
    it.skip("It throw an error when someone who is not the creator tries to update a community");
});
