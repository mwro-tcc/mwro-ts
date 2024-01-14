import { expect, test, describe } from 'vitest';
import { CryptService } from '../services/CryptService';

const cryptService = new CryptService();

describe('Auth Middleware', () => {
	test.todo('should return 401 if the token is not provided', async () => {});
	test.todo('should return 401 if the token is invalid', async () => {});
	test.todo('should return 401 if the token is expired', async () => {});
	test.todo('should not throw any error if the token is valid', async () => {});
});
