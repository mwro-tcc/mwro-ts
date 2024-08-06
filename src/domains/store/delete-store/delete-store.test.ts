import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeDeleteStoreUseCase } from ".";
import { randomUUID } from "crypto";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";
import { makeCreateStoreUseCase } from "../create-store";
import { makePgStoreAdapter } from "../../../infra/database/store";
import { makeCreateProductUseCase } from "../../product/create-product";

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

        const createProductUseCase = makeCreateProductUseCase(testDbInstance);
        await createProductUseCase.execute({
            product: { name: "Testando", price: 10, stock: 10, storeUuid: store.uuid },
            userUuidRequestingCreation: creatorUuid,
        });

        const deleteStoreUseCase = makeDeleteStoreUseCase(testDbInstance);
        await deleteStoreUseCase.execute(store.uuid, creatorUuid);

        const storeAdapter = makePgStoreAdapter(testDbInstance);
        const storeAfterDeletion = await storeAdapter.findByUuid(store.uuid);
        expect(storeAfterDeletion).toBeFalsy();
    });
});
