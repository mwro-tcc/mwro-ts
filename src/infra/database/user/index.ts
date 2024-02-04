import { db } from "../../../database";
import { NewUser, User, users } from "../../../database/schema/users";
import { IUserAdapter } from "./interface";
import { and, eq } from "drizzle-orm";

export type UserCreationPayload = Pick<User, "name" | "salt" | "email" | "password">

class UserAdapter implements IUserAdapter {
	constructor() { }
	async create(payload: NewUser): Promise<User> {
		const data = await db.insert(users).values(payload).returning();
		return data[0]
	}

	async isEmailAvailable(email: string): Promise<boolean> {
		const data = await db.select({ email: users.email }).from(users).where(eq(users.email, email)).limit(1)
		const userExists = !!data[0];
		const emailIsAvailable = !userExists
		return emailIsAvailable
	}

	async findByEmail(email: string): Promise<User> {
		const data = await db.select().from(users).where(eq(users.email, email)).limit(1)
		return data[0]
	}
}

export function makeUserAdapter() {
	return new UserAdapter()
}
