import { sql } from "drizzle-orm";
import { getEnvValues } from "../constants/EnvironmentVariables";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { randomUUID } from "crypto";
import { Client } from "pg";
import { readFileSync, readdirSync } from "fs";
import populate from "../database/seeds/seed-calls";

const env = getEnvValues();

export class TestDatabaseReseter {
    /**
     * Returns a Drizzle object connected to a database intended for tests usage.
     *
     * */
    async returnTestDbInstance(): Promise<NodePgDatabase> {
        const env = getEnvValues();

        const pool = new Client({
            host: env.DATABASE_HOST,
            port: Number(env.DATABASE_PORT),
            user: env.DATABASE_USER,
            password: env.DATABASE_PASSWORD,
            database: env.DATABASE_NAME,
        });
        await pool.connect();

        // Db is the ORM instance, which is a wrapper around the pg client
        const db = drizzle(pool);
        const newSchemaUuid = randomUUID();

        const schema = `test_${newSchemaUuid}`;

        const schemaCreationQuery = sql.raw(`create schema "${schema}"`);
        await db.execute(schemaCreationQuery);

        const setDefaultSchemaQuery = sql.raw(`SET SEARCH_PATH TO '${schema}'`);
        await db.execute(setDefaultSchemaQuery);

        await this.migrateTestDbInstance(db);
        await this.seedTestDbInstance(db);

        return db;
    }

    private async migrateTestDbInstance(db: NodePgDatabase): Promise<void> {
        this.assureTestEnvironment();
        const migrationsDir = readdirSync("./drizzle");
        const fileNames = migrationsDir.filter((fileName) => fileName !== "meta");
        for (const f of fileNames) {
            const migrationString = readFileSync(`./drizzle/${f}`).toString();
            const migrationSqlObj = sql.raw(migrationString);
            await db.execute(migrationSqlObj);
        }
    }

    private async seedTestDbInstance(db: NodePgDatabase): Promise<void> {
        await populate(db);
    }

    async dropAllSchemasInTestDatabase(db: NodePgDatabase): Promise<void> {
        this.assureTestEnvironment();

        const schemasList: { schema_name: string }[] = (await db
            .execute(
                sql.raw(
                    "SELECT schema_name FROM information_schema.schemata where schema_name like 'test%';",
                ),
            )
            .then((result) => result.rows)) as any;

        for (const s of schemasList) {
            await db.execute(sql.raw(`DROP SCHEMA "${s.schema_name}" CASCADE`));
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
