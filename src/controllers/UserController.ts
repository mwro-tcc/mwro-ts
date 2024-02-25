import { Request, Response, NextFunction } from "express";
import { makeSignUpUseCase } from "../domains/user/sign-up";
import { validate } from "../middlewares/validator/validator";
import { signUpSchema } from "../validations/SignUp";
import { signInSchema } from "../validations/SignIn";
import { makeSignInUseCase } from "../domains/user/sign-in";

const signUp = makeSignUpUseCase();
const signIn = makeSignInUseCase();

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
}

export const userController = new UserController();
