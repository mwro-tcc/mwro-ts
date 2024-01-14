import crypto from 'crypto';

import jsonwebtoken from "jsonwebtoken";

const SECRET = "ABCDEF"
const ENVIRONMENT = "development"
const TWENTY_FOUR_HOURS_MILLIS = 86400;
const ONE_HOUR_MILLIS = 3600;

type hashedPasswordData = {password:string, salt:string}

export type DecodedTokenPayload = { id: string; name: string; email: string }
export class CryptService {
	async hashPassword(password: string): Promise<hashedPasswordData> {
        const salt = crypto.randomBytes(16).toString('hex')
        const hashedPassword:string = crypto.pbkdf2Sync(password, salt, 10, 32, 'sha512').toString('hex')
        return {salt, password:hashedPassword};
	}

	async comparePasswords(
		hashedPasswordData: hashedPasswordData,
		candidatePassword: string
	): Promise<boolean> {
        const candidatePasswordHashed:string = crypto.pbkdf2Sync(candidatePassword, hashedPasswordData.salt, 10, 32, 'sha512').toString('hex')
		return candidatePasswordHashed === hashedPasswordData.password;
	}

	generatePasswordToken(userId: string): string {
		const passwordToken = crypto.randomBytes(16).toString('hex');

		const token = jsonwebtoken.sign(
			{ userId, passwordToken },
			SECRET as string,
			{
				expiresIn: this.getJWTExpireTimeMillis(ENVIRONMENT as string),
			}
		);
		return token;
	}

	verifyPasswordToken(token: string): {
		userId: string;
		passwordToken: string;
	} {
		const decoded = jsonwebtoken.verify(token, SECRET as string);
		return decoded as { userId: string; passwordToken: string };
	}

	generateJWT(userData: DecodedTokenPayload): string {
		const token = jsonwebtoken.sign(userData, SECRET as string, {
			expiresIn: this.getJWTExpireTimeMillis(ENVIRONMENT as string),
		});
		return token;
	}

	getJWTExpireTimeMillis(env: string): number {
		if (env === "development") return TWENTY_FOUR_HOURS_MILLIS;
		if (env === "production") return ONE_HOUR_MILLIS;
		return ONE_HOUR_MILLIS;
	}
}