import { NextFunction, Request, Response } from 'express';
import { makeCryptoService } from '../../services/crypto/CryptService';
import { ErrorMessages } from '../../constants/StatusError';

const cryptoService = makeCryptoService();


export function authenticationMiddleware() {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const { headers } = req;
			const { authorization } = headers;
			if (!authorization) {
				res.status(401).send({
					message: ErrorMessages.mustBeAuthenticated,
				});

				return
			}

			const decoded = cryptoService.verifyJWT(authorization);
			req.user = decoded;

			next();
		} catch (e) {
			return res.status(401).send({ message: ErrorMessages.mustBeAuthenticated });
		}
	};
}
