import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeDeleteStoreUseCase } from ".";
import { randomUUID } from "crypto";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";
import { makeCreateStoreUseCase } from "../create-store";
import { makePgStoreAdapter } from "../../../infra/database/store";

const testDatabaseReseter = new TestDatabaseReseter();

describe("Store Deletion UseCase test suite", () => {
    it("It should delete a new store without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const creatorUuid = TestDatabaseCommonValues.community1.admin1.userUuid;
        const createStoreUseCase = makeCreateStoreUseCase(testDbInstance);
        const store = await createStoreUseCase.execute({
            uuid: randomUUID(),
            communityUuid: TestDatabaseCommonValues.community1.uuid,
            userUuid: creatorUuid,
            name: "Testing store deletion",
        });
        const deleteStoreUseCase = makeDeleteStoreUseCase(testDbInstance);
        await deleteStoreUseCase.execute(store.uuid, creatorUuid);

        const storeAdapter = makePgStoreAdapter(testDbInstance);
        const storeAfterDeletion = await storeAdapter.findByUuid(store.uuid);
        expect(storeAfterDeletion).toBeFalsy();
    });
});
