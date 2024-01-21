import { User } from "../../../database/schema/users";
import { IUserAdapter } from "./interface";

export type UserCreationPayload = Pick<User, "name" | "salt" | "email" | "password">

class UserAdapter implements IUserAdapter {
	constructor() { }
	create(payload: UserCreationPayload): Promise<User> {
		throw new Error("Not implemented")
	}
}

export function makeUserAdapter() {
	return new UserAdapter()
}
