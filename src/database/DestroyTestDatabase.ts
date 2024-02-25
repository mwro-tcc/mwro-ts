import { TestDatabaseReseter } from "../services/TestDatabaseReseterService";

const execute = async () => {
    if (process.env.NODE_ENV !== "test") {
        throw new Error("This script should only be run in test environment");
    }
    const testservice = new TestDatabaseReseter();
    await testservice.prepareForTests();

    process.exit(0);
};

execute();
