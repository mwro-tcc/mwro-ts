import { signUpTest } from "./sign-up-test.js";

export const options = {
    vus: 10,
    duration: "180s",
};

export default function () {
    signUpTest();
}
