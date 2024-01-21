import type { Config } from 'drizzle-kit'

import { getEnvValues } from "./src/constants/EnvironmentVariables";

const env = getEnvValues()
export default {
	schema: './src/database/schema',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		host: env.DATABASE_HOST as string,
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME as string,
	},
} satisfies Config
