import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		setupFiles: 'dotenv/config',
		// havent found a way to make vitest load .env.test, but for now this works.
		env: {
			NODE_ENV: 'test',
			SECRET: 'abcdefg',
			DATABASE_PORT: '5429',
			DATABASE_PASSWORD: 'pswd_test',
			DATABASE_USER: 'mwro_test',
			DATABASE_HOST: 'localhost',
			DATABASE_NAME: 'mwro_db_test',
		},
	},
});
