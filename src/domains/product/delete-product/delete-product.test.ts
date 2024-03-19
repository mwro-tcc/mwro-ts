import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeDeleteProductUseCase } from ".";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";
import { makeProductAdapter } from "../../../infra/database/product";

const testDatabaseReseter = new TestDatabaseReseter();

describe("Product Deletion UseCase test suite", () => {
    it("It should delete a product without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const productAdapter = makeProductAdapter(testDbInstance);

        const productBeforeDeletion = await productAdapter.findByUuid(
            TestDatabaseCommonValues.community1.store1.product1.uuid,
        );
        if (!productBeforeDeletion) throw new Error("Internal test error: Product not found.");

        const deleteProductUseCase = makeDeleteProductUseCase(testDbInstance);

        await deleteProductUseCase.execute(
            TestDatabaseCommonValues.community1.store1.userUuid,
            TestDatabaseCommonValues.community1.store1.product1.uuid,
        );

        const productAfterDeletion = await productAdapter.findByUuid(
            TestDatabaseCommonValues.community1.store1.product1.uuid,
        );

        expect(productAfterDeletion).toBeUndefined();
    });

    it.skip("It throw an error when trying to delete a product that does not exist");
    it.skip("It throw an error when a invalid userUuid tries to delete a product");
    it.skip(
        "It throw an error when someone who is not the creator of the store tries to delete a product",
    );
});
