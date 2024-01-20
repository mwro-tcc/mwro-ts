import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { getEnvValues } from '../constants/EnvironmentVariables';
import { logger } from '../services/logger/logger';

const { Pool } = pg;

const env = getEnvValues()

type allowedEnvironments = 'development' | 'production' | 'test';
const environment = env.NODE_ENV as allowedEnvironments;

const commonConfig = {
	host: env.DATABASE_HOST,
	port: Number(env.DATABASE_PORT),
	user: env.DATABASE_USER,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
};
const config = {
	test: {
		...commonConfig,
	},
	development: {
		...commonConfig,
	},
	production: {
		...commonConfig,
		// Add other production configs as necessary here (eg: pool connections)
	},
};

// pool represents only the DB connection established by the pg driver
export const pool = new Pool(config[environment]);
pool.connect().then(() => logger.info("Connected to database successfully")).catch(() => logger.error("Failed to connect to database"))

// Db is the ORM instance, which is a wrapper around the client
export const db = drizzle(pool);
