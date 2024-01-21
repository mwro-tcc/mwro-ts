import { beforeEach, describe, expect, test } from 'vitest';
import { db } from '../../../database';
import { users } from '../../../database/schema/users';
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
			password: 'testWithMoreThanEightChars',
		};
		await userSignUpUseCase.execute(userPreCreation);

		const usersOnDb = await db.select().from(users);
		expect(usersOnDb).toBeDefined();
	});

	test('It should throw an invalid password error', async () => {
		const userPreCreation = {
			name: 'test',
			email: 'test',
			password: 'test',
		};
		await expect(userSignUpUseCase.execute(userPreCreation)).rejects.toThrowError('Passwords must be at least 8 characters long')
	})

	test('It should hash the users password', async () => {
		const userPreCreation = {
			name: 'test',
			email: 'test',
			password: 'testWithMoreThanEightChars',
		};
		await userSignUpUseCase.execute(userPreCreation);

		const usersOnDb = await db.select().from(users);
		expect(usersOnDb[0].password).not.toBe(userPreCreation.password);
	});


	test('It should throw an error due to repeated email', async () => {
		const userPreCreation1 = {
			name: 'test',
			email: 'test',
			password: 'testWithMoreThanEightChars',
		};
		await userSignUpUseCase.execute(userPreCreation1);
		await expect(userSignUpUseCase.execute(userPreCreation1)).rejects.toThrowError('Email already in use');
	});
});
