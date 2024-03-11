import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { TestDatabaseCommonValues } from "../../constants/TestDatabaseSeedValues";
import { makeUserAdapter } from "../../infra/database/user";
import { NewUser } from "../schema/users";

const users: NewUser[] = [
    {
        uuid: TestDatabaseCommonValues.user1.uuid,
        name: "Test User 1",
        password: TestDatabaseCommonValues.user1.password,
        email: TestDatabaseCommonValues.user1.email,
        salt: TestDatabaseCommonValues.user1.salt,
    },
    {
        uuid: TestDatabaseCommonValues.user2.uuid,
        name: "Test User 2",
        password: TestDatabaseCommonValues.user2.password,
        email: TestDatabaseCommonValues.user2.email,
        salt: TestDatabaseCommonValues.user2.salt,
    },
];
export async function populate(db: NodePgDatabase) {
    const userAdapter = makeUserAdapter(db);
    await userAdapter.bulkCreate(users);
}
