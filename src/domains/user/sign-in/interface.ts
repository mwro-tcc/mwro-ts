import { SignInPayload, SignInReturn } from "./types";

export interface ISignInUseCase {
    execute(payload: SignInPayload): Promise<SignInReturn>;
}
