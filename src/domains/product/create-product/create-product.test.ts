import { describe, expect, it } from "vitest";
import { makeCreateCommunityUseCase } from "../../community/create-community";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeCreateProductUseCase } from ".";

const testDatabaseReseter = new TestDatabaseReseter();

describe("Product Creation UseCase test suite", () => {
    it("It should create a new product without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const createProductUsecase = makeCreateProductUseCase(testDbInstance);

        const product = await createProductUsecase.execute({
            product: {
                name: "Test Product",
                description: "Test Product Description",
                price: 100,
                storeUuid: TestDatabaseCommonValues.community1.store1.uuid,
                stock: 10,
            },
            userUuidRequestingCreation: TestDatabaseCommonValues.community1.admin1.userUuid,
        });

        expect(product).toBeDefined();
    });
});
