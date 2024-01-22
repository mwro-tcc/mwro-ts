import { StatusError, ErrorMessages } from '../../../constants/StatusError';
import { User } from '../../../database/schema/users';
import { UserCreationPayload, makeUserAdapter } from '../../../infra/database/user';
import { IUserAdapter } from '../../../infra/database/user/interface';
import { DecodedTokenPayload, makeCryptoService } from '../../../services/crypto/CryptService';
import { ICryptoService } from '../../../services/crypto/interface';

type SignUpPayload = Omit<UserCreationPayload, 'salt'>;

type SignUpUseCaseReturn = {
	user: Omit<User, 'salt'>,
	token: string
}

class SignUpUseCase {
	constructor(
		private readonly cryptoService: ICryptoService,
		private readonly userAdapter: IUserAdapter,
	) { }

	async execute(payload: SignUpPayload) {
		if (payload.password.length < 8) throw new StatusError(400, ErrorMessages.passwordTooSmall);

		const isEmailAvailable = await this.userAdapter.isEmailAvailable(payload.email);
		if (!isEmailAvailable) throw new StatusError(400, ErrorMessages.emailAlreadyInUse);

		const encryptedPasswordData = await this.cryptoService.hashPassword(payload.password).catch(e => {
			throw new StatusError(500, e)
		});

		const userCreationPayload: UserCreationPayload = {
			...payload,
			password: encryptedPasswordData.password,
			salt: encryptedPasswordData.salt
		}
		const user = await this.userAdapter.create(userCreationPayload).catch(e => {
			throw new StatusError(500, e)
		})

		const jwtGenerationPayload: DecodedTokenPayload = {
			id: user.uuid,
			name: user.name,
			email: user.email
		}
		const token = this.cryptoService.generateJWT(jwtGenerationPayload)


		const returnValues: SignUpUseCaseReturn = {
			user,
			token
		}

		return returnValues
	}
}

export function makeSignUpUseCase() {
	return new SignUpUseCase(
		makeCryptoService(),
		makeUserAdapter()
	);
}
