import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { EditableUserFields, NewUser, User } from "../../../database/schema/users";
import { makePgUserAdapter } from "../../../infra/database/user";
import { IUserAdapter } from "../../../infra/database/user/interface";

class UpdateUserUseCase {
    constructor(private readonly userAdapter: IUserAdapter) {}
    async execute(userUuid: string, data: Partial<EditableUserFields>): Promise<User> {
        return await this.userAdapter.update(userUuid, data);
    }
}

export function makeUpdateUserUseCase(db: NodePgDatabase) {
    return new UpdateUserUseCase(makePgUserAdapter(db));
}
