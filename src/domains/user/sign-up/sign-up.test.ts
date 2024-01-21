import { beforeEach, describe, expect, test } from 'vitest';
import { db } from '../../../database';
import { users } from '../../../database/schema/users';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { TestDatabaseReseter } from '../../../services/TestDatabaseReseterService';
import { makeSignUpUseCase } from '.';

const testDatabaseReseter = new TestDatabaseReseter();
const userSignUpUseCase = makeSignUpUseCase();

describe('User Sign Up', () => {
	beforeEach(async () => {
		await testDatabaseReseter.truncateAllTables();
	});

	test('It should create a user', async () => {
		const userPreCreation = {
			name: 'test',
			email: 'test',
			password: 'test',
		};
		await userSignUpUseCase.execute(userPreCreation);

		const usersOnDb = await db.select().from(users);
		expect(usersOnDb).toBeDefined();
	});
});
