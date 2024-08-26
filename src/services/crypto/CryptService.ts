import crypto from "crypto";

import jsonwebtoken from "jsonwebtoken";
import { ICryptoService } from "./interface";

const SECRET = process.env.SECRET;
const ENVIRONMENT = process.env.NODE_ENV;
const TWENTY_FOUR_HOURS_SECONDS = 86400;
const ONE_HOUR_SECONDS = 3600;

export type hashedPasswordData = { password: string; salt: string };
export type DecodedToken = {
    userId: string;
    passwordToken: string;
};

export type DecodedTokenPayload = { id: string; name: string; email: string };
class CryptoService implements ICryptoService {
    async hashPassword(password: string): Promise<hashedPasswordData> {
        const salt = crypto.randomBytes(16).toString("hex");
        const hashedPassword: string = crypto
            .pbkdf2Sync(password, salt, 10, 32, "sha512")
            .toString("hex");
        return { salt, password: hashedPassword };
    }

    async comparePasswords(
        hashedPasswordData: hashedPasswordData,
        candidatePassword: string,
    ): Promise<boolean> {
        const candidatePasswordHashed: string = crypto
            .pbkdf2Sync(candidatePassword, hashedPasswordData.salt, 10, 32, "sha512")
            .toString("hex");
        return candidatePasswordHashed === hashedPasswordData.password;
    }

    /*
     * Generates a JWT token intended for change password requests
     * */
    generatePasswordToken(userId: string): string {
        const passwordToken = crypto.randomBytes(16).toString("hex");

        const jwtPayload = { userId, passwordToken };
        const jwtOptions = {
            expiresIn: this.getJWTExpireTimeMillis(ENVIRONMENT as string),
        };
        const token = jsonwebtoken.sign(jwtPayload, SECRET as string, jwtOptions);
        return token;
    }

    verifyPasswordToken(token: string): DecodedToken {
        const decoded = jsonwebtoken.verify(token, SECRET as string);
        return decoded as { userId: string; passwordToken: string };
    }

    verifyJWT(token: string): DecodedTokenPayload {
        const decoded = jsonwebtoken.verify(token, SECRET as string);
        return decoded as DecodedTokenPayload;
    }

    /*
     * Generates a JWT token intended for user session management
     * */
    generateJWT(userData: DecodedTokenPayload): string {
        const token = jsonwebtoken.sign(userData, SECRET as string, {
            expiresIn: this.getJWTExpireTimeMillis(ENVIRONMENT as string),
        });
        return token;
    }

    getJWTExpireTimeMillis(env: string): number {
        if (env === "development") return TWENTY_FOUR_HOURS_SECONDS;
        if (env === "production") return ONE_HOUR_SECONDS;
        return ONE_HOUR_SECONDS;
    }
}

export function makeCryptoService() {
    return new CryptoService();
}
