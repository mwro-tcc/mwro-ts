import { NewUser, User } from "../../../database/schema/users";

export interface IUserAdapter {
    bulkCreate(payload: NewUser[]): Promise<void>;
    create(payload: NewUser): Promise<User>;
    isEmailAvailable(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<User>;
    findByUuid(uuid: string): Promise<User>;
    bulkCreate(data: NewUser[]): Promise<void>;
}
