import { NodePgDatabase } from "drizzle-orm/node-postgres";
import {
    AnonimazebleUserFields,
    EditableUserFields,
    NewUser,
    User,
    users,
} from "../../../database/schema/users";
import { IUserAdapter } from "./interface";
import { and, eq } from "drizzle-orm";
import { databaseConnectionPool } from "../../../database";

export type UserCreationPayload = Pick<User, "name" | "salt" | "email" | "password">;

class PgUserAdapter implements IUserAdapter {
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
            .where(and(eq(users.email, email), eq(users.isDeleted, false)))
            .limit(1);
        const userExists = !!data[0];
        const emailIsAvailable = !userExists;
        return emailIsAvailable;
    }

    async findByEmail(email: string): Promise<User> {
        const data = await this.db
            .select()
            .from(users)
            .where(and(eq(users.email, email), eq(users.isDeleted, false)))
            .limit(1);
        return data[0];
    }

    async findByUuid(uuid: string): Promise<User> {
        const data = await this.db
            .select()
            .from(users)
            .where(and(eq(users.uuid, uuid), eq(users.isDeleted, false)))
            .limit(1);
        return data[0];
    }

    async update(uuid: string, data: Partial<EditableUserFields>): Promise<User> {
        const updated = await this.db
            .update(users)
            .set(data)
            .where(and(eq(users.uuid, uuid), eq(users.isDeleted, false)))
            .returning();
        return updated[0];
    }

    async anonymize(uuid: string, data: AnonimazebleUserFields): Promise<User> {
        const updated = await this.db
            .update(users)
            .set({ ...data, isDeleted: true })
            .where(eq(users.uuid, uuid))
            .returning();
        return updated[0];
    }
}

export function makePgUserAdapter(db: NodePgDatabase = databaseConnectionPool) {
    return new PgUserAdapter(db);
}
