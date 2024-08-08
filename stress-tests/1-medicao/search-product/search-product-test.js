import http from "k6/http";
import { sleep } from "k6";
import { generateRandomString } from "../../randomStringGenerator.js";

const localUrl = "http://localhost:3040";

export function searchProductTest() {
    const term = "Product" + Math.floor(Math.random() * 30000) + 1;
    const limit = 10;
    const offset = 0;

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlkIjoiYTYxYzc5ZTktNzcyZC00ZjI2LWExODgtNjQxMDc1MjM1YmJlIiwibmFtZSI6InRlc3RlIiwiaWF0IjoxNzIzMDc2ODc3LCJleHAiOjE3MjMxNjMyNzd9.BOJbh4r4qVABAvMWK_AYw8yAaoFHA-xerGcq2ZO6r1g";

    http.get(`${localUrl}/products/search?term=${term}&limit=${limit}&offset=${offset}`, {
        headers: {
            ["Authorization"]: token,
        },
    });

    sleep(1);
}
