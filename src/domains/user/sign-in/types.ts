import { User } from "../../../database/schema/users";

export type SignInReturn = {
    user: User;
    token: string;
};

export type SignInPayload = {
    email: string;
    password: string;
};
