import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { makeUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makeCryptoService } from "../../../services/crypto/CryptService";
import { ICryptoService } from "../../../services/crypto/interface";
import { ISignInUseCase, } from "./interface";
import { SignInPayload, SignInReturn } from "./types";

class SignInUseCase implements ISignInUseCase {
	constructor(
		private readonly userAdapter: IUserAdapter,
		private readonly cryptoService: ICryptoService
	) { }

	async execute(payload: SignInPayload): Promise<SignInReturn> {
		const user = await this.userAdapter.findByEmail(payload.email);
		if (!user) throw new StatusError(400, ErrorMessages.invalidCredentials)

		const passwordMatches = await this.cryptoService.comparePasswords({ password: user.password, salt: user.salt }, payload.password)
		if (!passwordMatches) throw new StatusError(400, ErrorMessages.invalidCredentials);

		const token = this.cryptoService.generateJWT({ email: user.email, id: user.uuid, name: user.name })

		return {
			jwt: token
		}
	}
}

export function makeSignInUseCase() {
	return new SignInUseCase(
		makeUserAdapter(),
		makeCryptoService()
	)
}
