import { DecodedToken, DecodedTokenPayload, hashedPasswordData } from "./CryptService";

export interface ICryptoService {
	hashPassword(password: string): Promise<hashedPasswordData>
	comparePasswords(hashedPasswordData: hashedPasswordData, candidatePassword: string): Promise<boolean>

	generatePasswordToken(userId: string): string
	verifyPasswordToken(token: string): DecodedToken

	generateJWT(userData: DecodedTokenPayload): string
	verifyJWT(token: string): DecodedTokenPayload
	getJWTExpireTimeMillis(env: string): number
}
