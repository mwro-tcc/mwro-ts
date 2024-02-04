import { expect, test, describe } from 'vitest';
import { makeCryptoService } from './CryptService';

const cryptService = makeCryptoService()

describe('Encrypting Service', () => {
	test('hashPassword should return a object containing the hashed password and the salt generated', async () => {
		const testingPassword = 'testingPassword';

		const hashedPasswordData = await cryptService.hashPassword(testingPassword);

		expect(hashedPasswordData.password).not.toBe(testingPassword);
		expect(hashedPasswordData.salt).toBeTypeOf('string');
		expect(hashedPasswordData.password).toBeTypeOf('string');
	});

	test('comparePasswords should return true if the password is correct', async () => {
		const testingPassword = 'testingPassword';
		const hashedPasswordData = await cryptService.hashPassword(testingPassword);

		const result = await cryptService.comparePasswords(hashedPasswordData, testingPassword);

		expect(result).toBe(true);
	});

	test('comparePasswords should return false if the password is incorrect', async () => {
		const testingPassword = 'testingPassword';
		const hashedPasswordData = await cryptService.hashPassword(testingPassword);

		const result = await cryptService.comparePasswords(hashedPasswordData, 'incorrectPassword');

		expect(result).toBe(false);
	});

	test('generatePasswordToken should return a token', () => {
		const token = cryptService.generatePasswordToken('userId');

		expect(token).toBeTypeOf('string');
	});

	test('verifyPasswordToken should return the userId and passwordToken', () => {
		const token = cryptService.generatePasswordToken('userId');

		const result = cryptService.verifyPasswordToken(token);

		expect(result.userId).toBe('userId');
		expect(result.passwordToken).toBeTypeOf('string');
	});

	test('generateJWT should return a token', () => {
		const token = cryptService.generateJWT({
			id: 'userId-test',
			name: 'userName',
			email: 'userEmail',
		});

		expect(token).toBeTypeOf('string');
	});

	test('getJWTExpireTimeMillis should return 86400 if the env is development', () => {
		const result = cryptService.getJWTExpireTimeMillis('development');

		expect(result).toBe(86400);
	});

	test('getJWTExpireTimeMillis should return 3600 if the env is production', () => {
		const result = cryptService.getJWTExpireTimeMillis('production');

		expect(result).toBe(3600);
	});

	test('getJWTExpireTimeMillis should return 3600 if the env is not development or production', () => {
		const result = cryptService.getJWTExpireTimeMillis('test');

		expect(result).toBe(3600);
	});
});
