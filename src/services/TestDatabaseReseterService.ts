import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import { sql } from 'drizzle-orm';
import { db } from '../database';

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

		for (let table of tables.rows) {
			console.log(`Truncating ${table.table_name}`);
			const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
			await db.execute(query); // Truncate (clear all the data) the table
			console.log(`${table.table_name} truncated`);
		}
	}

	private assureTestEnvironment = () => {
		const isTestEnv = process.env.NODE_ENV === 'test';
		const isTestDatabase = process.env.DATABASE_NAME === 'mwro_db_test';
		const isTestUser = process.env.DATABASE_USER === 'mwro_test';

		const isOnTestEnvironment = isTestEnv && isTestDatabase && isTestUser;

		console.log(isTestEnv);
		console.log(process.env.DATABASE_NAME);
		console.log(process.env.DATABASE_USER);

		if (!isOnTestEnvironment) throw new Error('Truncate should be used only in test environment');
	};
}
