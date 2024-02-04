import { NewUser, User } from "../../../database/schema/users";

export interface IUserAdapter {
	create(payload: NewUser): Promise<User>
	isEmailAvailable(email: string): Promise<boolean>
	findByEmail(email: string): Promise<User>
}
