import { beforeEach, describe, expect, test } from "vitest";
import { users } from "../../../database/schema/users";
import { TestDatabaseReseter } from "../../../services/TestDatabaseReseterService";
import { makeSignUpUseCase } from ".";
import { ErrorMessages, StatusError } from "../../../constants/StatusError";
import { makeCryptoService } from "../../../services/crypto/CryptService";
import { databaseConnectionPool } from "../../../database";

const testDatabaseReseter = new TestDatabaseReseter();
const cryptoService = makeCryptoService();

describe("User Sign Up", () => {
    test("It should create a user", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const userSignUpUseCase = makeSignUpUseCase(testDbInstance);

        const userPreCreation = {
            name: "test",
            email: "test",
            password: "testWithMoreThanEightChars",
        };
        await userSignUpUseCase.execute(userPreCreation);

        const usersOnDb = await testDbInstance.select().from(users);
        expect(usersOnDb).toBeDefined();
    });

    test("It should throw an invalid password error", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const userSignUpUseCase = makeSignUpUseCase(testDbInstance);

        const userPreCreation = {
            name: "test",
            email: "test",
            password: "test",
        };
        await expect(userSignUpUseCase.execute(userPreCreation)).rejects.toThrow(
            new StatusError(400, ErrorMessages.passwordTooSmall),
        );
    });

    test("It should hash the users password", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const userSignUpUseCase = makeSignUpUseCase(testDbInstance);

        const userPreCreation = {
            name: "test",
            email: "test",
            password: "testWithMoreThanEightChars",
        };
        await userSignUpUseCase.execute(userPreCreation);

        const usersOnDb = await testDbInstance.select().from(users);
        expect(usersOnDb[0].password).not.toBe(userPreCreation.password);
    });

    test("It should throw an error due to repeated email", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const userSignUpUseCase = makeSignUpUseCase(testDbInstance);

        const userPreCreation1 = {
            name: "test",
            email: "test",
            password: "testWithMoreThanEightChars",
        };
        await userSignUpUseCase.execute(userPreCreation1);
        await expect(userSignUpUseCase.execute(userPreCreation1)).rejects.toThrow(
            new StatusError(400, ErrorMessages.emailAlreadyInUse),
        );
    });

    test("it should generate a valid JWT on a user creation", async () => {
        const testDbInstance = await testDatabaseReseter.returnTestDbInstance();
        const userSignUpUseCase = makeSignUpUseCase(testDbInstance);

        const userPreCreation = {
            name: "test",
            email: "test",
            password: "testWithMoreThanEightChars",
        };
        const created = await userSignUpUseCase.execute(userPreCreation);
        const validated = cryptoService.verifyJWT(created.token);
        expect(validated.name).toBe(userPreCreation.name);
        expect(validated.id).toBeTypeOf("string");
    });
});
