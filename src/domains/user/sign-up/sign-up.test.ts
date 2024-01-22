import { beforeEach, describe, expect, test } from 'vitest';
import { db } from '../../../database';
import { users } from '../../../database/schema/users';
import { TestDatabaseReseter } from '../../../services/TestDatabaseReseterService';
import { makeSignUpUseCase } from '.';
import { ErrorMessages, StatusError } from '../../../constants/StatusError';
import { makeCryptoService } from '../../../services/crypto/CryptService';

const testDatabaseReseter = new TestDatabaseReseter();
const userSignUpUseCase = makeSignUpUseCase();
const cryptoService = makeCryptoService();

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
		await expect(userSignUpUseCase.execute(userPreCreation)).rejects.toThrow(new StatusError(400, ErrorMessages.passwordTooSmall))
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
		await expect(userSignUpUseCase.execute(userPreCreation1)).rejects.toThrow(new StatusError(400, ErrorMessages.emailAlreadyInUse))
	});

	test('it should generate a valid JWT on a user creation', async () => {
		const userPreCreation = {
			name: 'test',
			email: 'test',
			password: 'testWithMoreThanEightChars',
		};
		const created = await userSignUpUseCase.execute(userPreCreation);
		const validated = cryptoService.verifyJWT(created.token);
		expect(validated.name).toBe(userPreCreation.name);
		expect(validated.id).toBeTypeOf('string');
	});
});
