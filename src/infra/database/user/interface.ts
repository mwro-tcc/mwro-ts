import { UserCreationPayload } from ".";
import { User } from "../../../database/schema/users";

export interface IUserAdapter {
	create(payload: UserCreationPayload): Promise<User>
}
