import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeUpdateStoreUseCase } from ".";
import { randomUUID } from "crypto";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";
import { makeCreateStoreUseCase } from "../create-store";

const testDatabaseReseter = new TestDatabaseReseter();

describe("Store Update UseCase test suite", () => {
    it("It should update a new store without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const creatorUuid = TestDatabaseCommonValues.community1.admin1.userUuid;
        const createStoreUseCase = makeCreateStoreUseCase(testDbInstance);
        const store = await createStoreUseCase.execute({
            uuid: randomUUID(),
            communityUuid: TestDatabaseCommonValues.community1.uuid,
            userUuid: creatorUuid,
            name: "Testing store creation",
        });
        const updateStoreUseCase = makeUpdateStoreUseCase(testDbInstance);
        const updatedStore = await updateStoreUseCase.execute(store.uuid, creatorUuid, {
            name: "nome alterado",
        });

        expect(updatedStore).toBeDefined();
        expect(updatedStore.uuid).toBe(store.uuid);
        expect(updatedStore.userUuid).toBe(store.userUuid);
        expect(updatedStore.communityUuid).toBe(store.communityUuid);
        expect(updatedStore.name).toBe("nome alterado");
    });
});
