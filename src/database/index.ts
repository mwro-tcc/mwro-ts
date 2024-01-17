import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const { Pool } = pg;

type allowedEnvironments = 'development' | 'production' | 'test';
const environment = process.env.NODE_ENV as allowedEnvironments;

const commonConfig = {
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
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
await pool.connect();

// Db is the ORM instance, which is a wrapper around the client
export const db = drizzle(pool);
