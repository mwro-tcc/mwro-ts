import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/database/schema',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		host: process.env.DATABASE_HOST as string,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME as string,
	},
} satisfies Config;
