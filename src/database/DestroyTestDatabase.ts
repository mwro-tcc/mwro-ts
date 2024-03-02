import { TestDatabaseReseter } from "../services/TestDatabaseReseterService";

const reseter = new TestDatabaseReseter();
const execute = async () => {
    if (process.env.NODE_ENV !== "test") {
        throw new Error("This script should only be run in test environment");
    }

    const connection = await reseter.returnTestDbInstance();
    await reseter.dropAllSchemasInTestDatabase(connection);

    process.exit(0);
};

execute();
