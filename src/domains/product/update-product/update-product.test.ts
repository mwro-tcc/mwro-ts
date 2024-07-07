import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";

import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";
import { makePgProductAdapter } from "../../../infra/database/product";
import { makeUpdateProductUseCase } from ".";

const testDatabaseReseter = new TestDatabaseReseter();

describe("Product Update UseCase test suite", () => {
    it("It should update a product without errors", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const productAdapter = makePgProductAdapter(testDbInstance);

        const productBeforeDeletion = await productAdapter.findByUuid(
            TestDatabaseCommonValues.community1.store1.product1.uuid,
        );
        if (!productBeforeDeletion) throw new Error("Internal test error: Product not found.");

        const updateProductUseCase = makeUpdateProductUseCase(testDbInstance);

        const productBeforeUpdate = await productAdapter.findByUuid(
            TestDatabaseCommonValues.community1.store1.product1.uuid,
        );

        await updateProductUseCase.execute(
            TestDatabaseCommonValues.community1.store1.userUuid,
            TestDatabaseCommonValues.community1.store1.product1.uuid,
            {
                name: "New product name on update usecase",
            },
        );

        const productAfterUpdate = await productAdapter.findByUuid(
            TestDatabaseCommonValues.community1.store1.product1.uuid,
        );

        // this should change
        expect(productBeforeUpdate.name).not.toBe(productAfterUpdate.name);

        // this should not
        expect(productBeforeUpdate.uuid).toBe(productAfterUpdate.uuid);
    });

    it.skip("It throw an error when trying to update a product that does not exists");
    it.skip("It throw an error when a invalid userUuid tries to update a product");
    it.skip(
        "It throw an error when someone who is not the creator of the store tries to update a product",
    );
});
