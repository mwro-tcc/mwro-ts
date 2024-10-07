import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { databaseConnectionPool } from "../../../database";
import { makePgUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";
import { IDeleteAccount } from "./interface";
import { StatusError } from "../../../constants/StatusError";

export function makeDeleteAccountUseCase(db: NodePgDatabase = databaseConnectionPool) {
    return new DeleteAccountUseCase(makePgUserAdapter(db));
}

class DeleteAccountUseCase implements IDeleteAccount {
    constructor(private readonly userAdapter: IUserAdapter) { }
    async execute(userId: string): Promise<void> {
        const user = await this.userAdapter.findByUuid(userId);
        if (!user) throw new StatusError(404, "User not found");

        const uuidFraction = user.uuid.substring(0, 7);
        // We may also want to transfer Community Ownership etc...
        await this.userAdapter.anonymize(userId, {
            name: `Anonymous User ${uuidFraction}`,
            email: "deletedAccount",
            phoneNumber: "deletedAccount"
        });
    }
}
