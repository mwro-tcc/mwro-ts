import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { TestDatabaseCommonValues } from "../../constants/TestDatabaseSeedValues";
import { makeUserAdapter } from "../../infra/database/user";
import { NewUser } from "../schema/users";

const users: NewUser[] = [
    {
        uuid: TestDatabaseCommonValues.user1.uuid,
        name: "Test User 1",
        password: TestDatabaseCommonValues.user1.password,
        salt: "6160bb1eb39ff29f5bebe402c4a9e459",
        email: TestDatabaseCommonValues.user1.email,
    },
    {
        uuid: TestDatabaseCommonValues.user2.uuid,
        name: "Test User 2",
        password: TestDatabaseCommonValues.user2.password,
        salt: "d34087171cbe00fdb81b2f30b83df4fb",
        email: TestDatabaseCommonValues.user2.email,
    },
];
export async function populate(db: NodePgDatabase) {
    const userAdapter = makeUserAdapter(db);
    await userAdapter.bulkCreate(users);
}
