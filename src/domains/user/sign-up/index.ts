import { User } from '../../../database/schema/users';
import { UserCreationPayload, makeUserAdapter } from '../../../infra/database/user';
import { IUserAdapter } from '../../../infra/database/user/interface';
import { DecodedTokenPayload, makeCryptoService } from '../../../services/crypto/CryptService';
import { ICryptoService } from '../../../services/crypto/interface';
import { logger } from '../../../services/logger/logger';

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
		if (payload.password.length < 8) throw new Error('Passwords must be at least 8 characters long');

		const isEmailAvailable = await this.userAdapter.isEmailAvailable(payload.email);
		if (!isEmailAvailable) throw new Error('Email already in use');

		const encryptedPasswordData = await this.cryptoService.hashPassword(payload.password).catch(logger.error)
		if (!encryptedPasswordData) throw new Error('Could not hash password')

		const userCreationPayload: UserCreationPayload = {
			...payload,
			password: encryptedPasswordData.password,
			salt: encryptedPasswordData.salt
		}
		const user = await this.userAdapter.create(userCreationPayload).catch(e => {
			throw new Error('Error on user creation', e)
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
