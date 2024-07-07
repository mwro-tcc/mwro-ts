import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { makePgStoreAdapter } from "../../infra/database/store";
import { NewStore } from "../schema/stores";
import { TestDatabaseCommonValues } from "../../constants/TestDatabaseSeedValues";

const stores: NewStore[] = [
    {
        uuid: TestDatabaseCommonValues.community1.store1.uuid,
        name: "Test Store 1",
        userUuid: TestDatabaseCommonValues.community1.store1.userUuid,
        communityUuid: TestDatabaseCommonValues.community1.store1.communityUuid,
    },
];
export async function populate(db: NodePgDatabase) {
    const storeAdapter = makePgStoreAdapter(db);
    await storeAdapter.bulkCreate(stores);
}
