import { beforeEach, describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeSignInUseCase } from ".";
import { SignUpPayload, makeSignUpUseCase } from "../sign-up";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";

const testDatabaseReseter = new TestDatabaseReseter();

const signUpPayload: SignUpPayload = {
    email: "pedro@email.com",
    password: "testing1234",
    name: "Pedro",
};

describe("User Sign In", () => {
    it("Should return a JWT string after a successfull sign in operation", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const signInUseCase = makeSignInUseCase(testDbInstance);
        const signUpUseCase = makeSignUpUseCase(testDbInstance);

        await signUpUseCase.execute(signUpPayload);
        const token = await signInUseCase.execute({
            email: signUpPayload.email,
            password: signUpPayload.password,
        });

        expect(token).toBeDefined();
    });

    it("Should throw an invalid credentials on unregistered email", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const signInUseCase = makeSignInUseCase(testDbInstance);

        await expect(
            signInUseCase.execute({ email: "unregisteredEmail@email.com", password: "1234" }),
        ).rejects.toThrow(new StatusError(400, ErrorMessages.invalidCredentials));
    });

    it("Should throw an invalid credentials on incorrect  password", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();

        const signInUseCase = makeSignInUseCase(testDbInstance);
        const signUpUseCase = makeSignUpUseCase(testDbInstance);

        await signUpUseCase.execute(signUpPayload);

        await expect(
            signInUseCase.execute({ email: signUpPayload.email, password: "1234" }),
        ).rejects.toThrow(new StatusError(400, ErrorMessages.invalidCredentials));
    });
});
