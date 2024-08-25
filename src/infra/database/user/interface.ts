import {
    AnonimazebleUserFields,
    EditableUserFields,
    NewUser,
    User,
} from "../../../database/schema/users";

export interface IUserAdapter {
    // readers
    isEmailAvailable(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<User>;
    findByUuid(uuid: string): Promise<User>;

    // writters
    bulkCreate(payload: NewUser[]): Promise<void>;
    create(payload: NewUser): Promise<User>;
    update(uuid: string, payload: Partial<EditableUserFields>): Promise<User>;
    anonymize(uuid: string, data: AnonimazebleUserFields): Promise<User>;
}
