import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NewUser, User, users } from "../../../database/schema/users";
import { IUserAdapter } from "./interface";
import { eq } from "drizzle-orm";
import { databaseConnectionPool } from "../../../database";

export type UserCreationPayload = Pick<User, "name" | "salt" | "email" | "password">;

class UserAdapter implements IUserAdapter {
    constructor(private readonly db: NodePgDatabase) {}
    async create(payload: NewUser): Promise<User> {
        const data = await this.db.insert(users).values(payload).returning();
        return data[0];
    }

    async bulkCreate(payload: NewUser[]): Promise<void> {
        await this.db.insert(users).values(payload).returning();
    }

    async isEmailAvailable(email: string): Promise<boolean> {
        const data = await this.db
            .select({ email: users.email })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        const userExists = !!data[0];
        const emailIsAvailable = !userExists;
        return emailIsAvailable;
    }

    async findByEmail(email: string): Promise<User> {
        const data = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
        return data[0];
    }

    async findByUuid(uuid: string): Promise<User> {
        const data = await this.db.select().from(users).where(eq(users.uuid, uuid)).limit(1);
        return data[0];
    }

    async bulkCreate(data: NewUser[]): Promise<void> {
        await this.db.insert(users).values(data);
    }
}

export function makeUserAdapter(db: NodePgDatabase = databaseConnectionPool) {
    return new UserAdapter(db);
}
