import { describe, expect, it } from "vitest";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeSignInUseCase } from ".";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { TestDatabaseCommonValues } from "../../../constants/TestDatabaseSeedValues";

const testDatabaseReseter = new TestDatabaseReseter();

describe("User Sign In", () => {
    it("Should return a JWT string after a successfull sign in operation", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const signInUseCase = makeSignInUseCase(testDbInstance);

        const token = await signInUseCase.execute({
            email: TestDatabaseCommonValues.user1.email,
            password: TestDatabaseCommonValues.user1.unhashedPassword,
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

        await expect(
            signInUseCase.execute({
                email: TestDatabaseCommonValues.user1.email,
                password: "1234",
            }),
        ).rejects.toThrow(new StatusError(400, ErrorMessages.invalidCredentials));
    });
});
