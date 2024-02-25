import { sql } from "drizzle-orm";
import { db } from "../database";
import { getEnvValues } from "../constants/EnvironmentVariables";

const env = getEnvValues();

export class TestDatabaseReseter {
    async prepareForTests() {
        this.assureTestEnvironment();

        let query = sql.raw(
            `DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO mwro_test; GRANT ALL ON SCHEMA public TO public; COMMENT ON SCHEMA public IS 'standard public schema';`,
        );
        await db.execute(query);

        query = sql.raw(`DROP SCHEMA IF EXISTS drizzle CASCADE`);
        await db.execute(query);
    }

    async truncateAllTables() {
        this.assureTestEnvironment();
        const query = sql<string>`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`;

        const tables = await db.execute(query); // retrieve tables

        for (const table of tables.rows) {
            const query = sql.raw(`TRUNCATE TABLE "${table.table_name}" CASCADE;`);

            await db.execute(query); // Truncate (clear all the data) the table
        }
    }

    private assureTestEnvironment = () => {
        const isTestEnv = env.NODE_ENV === "test";
        const isTestDatabase = env.DATABASE_NAME === "mwro_db_test";
        const isTestUser = env.DATABASE_USER === "mwro_test";

        const isOnTestEnvironment = isTestEnv && isTestDatabase && isTestUser;

        if (!isOnTestEnvironment)
            throw new Error("Truncate should be used only in test environment");
    };
}
