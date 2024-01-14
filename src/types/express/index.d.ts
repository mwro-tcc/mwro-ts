import { DecodedTokenPayload } from "../../services/CryptService";


declare global {
	namespace Express {
	  export interface Request {
		user: DecodedTokenPayload;
	  }
	}
  }