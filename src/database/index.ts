import pg, { PoolConfig } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { getEnvValues } from "../constants/EnvironmentVariables";
import { logger } from "../services/logger/logger";

const { Pool } = pg;

const env = getEnvValues();

type allowedEnvironments = "development" | "production" | "test";
const environment = env.NODE_ENV as allowedEnvironments;

const commonConfig = {
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
};

const config = new Map<string, PoolConfig>();
config.set("test", commonConfig);
config.set("development", commonConfig);
config.set("production", commonConfig);

// pool represents only the DB connection established by the pg driver
export const pool = new Pool(config.get(environment));
pool.connect()
    .then(() => logger.info("Connected to database successfully"))
    .catch((e) => {
        logger.error("Failed to connect to database");
        logger.error(e);
    });

// Db is the ORM instance, which is a wrapper around the client
export const databaseConnectionPool = drizzle(pool);
