import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { TestDatabaseCommonValues } from "../../constants/TestDatabaseSeedValues";
import { NewProduct } from "../schema/products";
import { makePgProductAdapter } from "../../infra/database/product";

const products: NewProduct[] = [
    {
        uuid: TestDatabaseCommonValues.community1.store1.product1.uuid,
        name: "Test Product 1",
        storeUuid: TestDatabaseCommonValues.community1.store1.product1.storeUuid,
        price: 1000,
        stock: 100,
        description: "Test Product 1 Description",
    },
];
export async function populate(db: NodePgDatabase) {
    const productAdapter = makePgProductAdapter(db);
    await productAdapter.bulkCreate(products);
}
