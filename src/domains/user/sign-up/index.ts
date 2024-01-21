import { UserCreationPayload, makeUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makeCryptoService } from "../../../services/crypto/CryptService";
import { ICryptoService } from "../../../services/crypto/interface";

type SignUpPayload = Omit<UserCreationPayload, "salt">

class SignUpUseCase {
	constructor(
		private readonly cryptoService: ICryptoService,
		private readonly userAdapter: IUserAdapter,
	) { }
	async execute(payload: SignUpPayload) {
		throw new Error('Not implemented');
	}
}

export function makeSignUpUseCase() {
	return new SignUpUseCase(
		makeCryptoService(),
		makeUserAdapter()
	);
}
