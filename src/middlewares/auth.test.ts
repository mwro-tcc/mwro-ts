import { NextFunction, Request, Response } from 'express';
import { expect, test, describe } from 'vitest';
import { authenticationMiddleware } from './auth';


describe('Auth Middleware', () => {
	//TODO figure out proper mocking to improve testing on this middleware
	test.todo('should call the next() function if the token is valid', async () => { });
	test('should return 401 if the token is not provided', async () => {
		const req = {
			headers: null

		} as any as Request;
		const res = {
			status: () => { return { send: () => null } }
		} as any as Response;
		const next = () => null as any as NextFunction;
		const cb = authenticationMiddleware()

		expect(cb(req, res, next)).toBe(false)


	});

	test.todo('should return 401 if the token is invalid', async () => { });
	test.todo('should return 401 if the token is expired', async () => { });
});
