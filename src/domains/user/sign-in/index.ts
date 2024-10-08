import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { makePgUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { makeCryptoService } from "../../../services/crypto/CryptService";
import { ICryptoService } from "../../../services/crypto/interface";
import { ISignInUseCase } from "./interface";
import { SignInPayload, SignInReturn } from "./types";
import { databaseConnectionPool } from "../../../database";

class SignInUseCase implements ISignInUseCase {
    constructor(
        private readonly userAdapter: IUserAdapter,
        private readonly cryptoService: ICryptoService,
    ) {}

    async execute(payload: SignInPayload): Promise<SignInReturn> {
        const user = await this.userAdapter.findByEmail(payload.email);
        if (!user) throw new StatusError(400, ErrorMessages.invalidCredentials);

        const passwordMatches = await this.cryptoService.comparePasswords(
            { password: user.password, salt: user.salt },
            payload.password,
        );
        if (!passwordMatches) throw new StatusError(400, ErrorMessages.invalidCredentials);

        const token = this.cryptoService.generateJWT({
            email: user.email,
            id: user.uuid,
            name: user.name,
        });

        return {
            user,
            token,
        };
    }
}

export function makeSignInUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new SignInUseCase(makePgUserAdapter(db), makeCryptoService());
}
