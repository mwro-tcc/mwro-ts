import http from "k6/http";
import { sleep } from "k6";
import { generateRandomString } from "../../randomStringGenerator.js";

const localUrl = "http://localhost:3040";

export function signUpTest() {
    const random = generateRandomString(10);

    http.post(`${localUrl}/users/sign-up`, {
        name: random,
        password: `${random}123`,
        email: `${random}@emailprovider.com`,
    });

    sleep(1);
}
