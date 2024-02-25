import { DecodedTokenPayload } from "../../services/crypto/CryptService";

declare global {
    namespace Express {
        export interface Request {
            user: DecodedTokenPayload;
        }
    }
}
