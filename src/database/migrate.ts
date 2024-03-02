import { migrate } from "drizzle-orm/node-postgres/migrator";
import { databaseConnectionPool } from ".";
import { logger } from "../services/logger/logger";

// This will run migrations on the database, skipping the ones already applied
migrate(databaseConnectionPool, { migrationsFolder: "./drizzle" }).then(() => {
    logger.info("Migrations ran successfully!");
    process.exit(0);
});
