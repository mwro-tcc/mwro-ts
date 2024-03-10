import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeCreateStoreUseCase } from ".";
import { randomUUID } from "crypto";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";

const testDatabaseReseter = new TestDatabaseReseter();

describe("Store Creation UseCase test suite", () => {
    it("It should create a new store without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const createStoreUseCase = makeCreateStoreUseCase(testDbInstance);
        const store = await createStoreUseCase.execute({
            uuid: randomUUID(),
            communityUuid: TestDatabaseCommonValues.community1.uuid,
            userUuid: TestDatabaseCommonValues.community1.admin1.userUuid,
            name: "Testing store creation",
        });

        expect(store).toBeDefined();
    });
});
