import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { populate as createUsers } from "./1-create-default-users";
import { populate as createCommunities } from "./2-create-default-communities";
import { populate as createStores } from "./3-create-default-stores";

export default async function populate(db: NodePgDatabase) {
    await createUsers(db);
    await createCommunities(db);
    await createStores(db);
}
