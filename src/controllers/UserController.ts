import { Request, Response, NextFunction } from "express";
import { makeSignUpUseCase } from "../domains/user/sign-up";
import { validate } from "../middlewares/validator/validator";
import { signUpSchema } from "../validations/SignUp";
import { signInSchema } from "../validations/SignIn";
import { makeSignInUseCase } from "../domains/user/sign-in";
import { updateUserSchema } from "../validations/UpdateUser";
import { makeUpdateUserUseCase } from "../domains/user/update-user";
import { databaseConnectionPool } from "../database";
import { findByUuidSchema } from "../validations/FindByUuid";
import { makePgUserAdapter } from "../infra/database/user";
import { ErrorMessages, StatusError } from "../constants/StatusError";
import { makeDeleteAccountUseCase } from "../domains/user/delete-account";

const signUp = makeSignUpUseCase(databaseConnectionPool);
const signIn = makeSignInUseCase(databaseConnectionPool);
const updateUser = makeUpdateUserUseCase(databaseConnectionPool);
const deleteAccount = makeDeleteAccountUseCase(databaseConnectionPool);

const userAdapter = makePgUserAdapter(databaseConnectionPool);

class UserController {
    signUp() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(signUpSchema, req)
                .then(async (validated) => {
                    return await signUp.execute(validated.body);
                })
                .then((data) => res.status(201).send(data))
                .catch(next);
        };
    }
    signIn() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(signInSchema, req)
                .then(async (validated) => {
                    return signIn.execute(validated.body);
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    findById() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    const user = await userAdapter.findByUuid(validated.params.uuid);
                    if (!user) throw new StatusError(404, ErrorMessages.userNotFound);
                    return user;
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    me() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await userAdapter.findByUuid(req.user.id);
                if (!user) throw new StatusError(404, ErrorMessages.userNotFound);
                res.status(200).send(user);
                return user;
            } catch (e) {
                next(e);
            }
        };
    }

    update() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(updateUserSchema, req)
                .then(async (validated) => {
                    return updateUser.execute(req.user.id, validated.body);
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }

    deleteAccount() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return deleteAccount
                .execute(req.user.id)
                .then(() => res.status(204).send())
                .catch(next);
        };
    }
}

export const userController = new UserController();
