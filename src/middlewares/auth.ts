import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { DecodedTokenPayload } from '../services/CryptService';

const { SECRET } = process.env;

export function authenticationMiddleware() {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const { headers } = req;
			const { authorization } = headers;
			if (!authorization)
				return res.status(401).send({
					message: 'Only authenticated users can perform this action.',
				});

			const decoded = verifyToken(authorization);
			req.user = decoded;

			next();
		} catch (e) {
			return res.status(401).send({ message: 'Only authenticated users can perform this action.' });
		}
	};
}

const verifyToken = (token: string) => {
	const decoded = jsonwebtoken.verify(token, SECRET as string) as DecodedTokenPayload;
	return decoded;
};
