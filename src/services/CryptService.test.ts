import { expect, test, describe } from 'vitest'
import {CryptService} from './CryptService';

const cryptService = new CryptService();


describe("Encrypting Service", () => {
    test("hashPassword should return a object containing the hashed password and the salt generated", async () => {
        const testingPassword = "testingPassword";
        
        const hashedPasswordData = await cryptService.hashPassword(testingPassword);

        expect(hashedPasswordData.password).not.toBe(testingPassword);
        expect(hashedPasswordData.salt).toBeTypeOf("string");
        expect(hashedPasswordData.password).toBeTypeOf("string");
    });
});