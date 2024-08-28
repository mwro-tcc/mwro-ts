import http from "k6/http";
import { sleep } from "k6";
import { generateRandomString } from "../../randomStringGenerator.js";

const localUrl = "http://localhost:3040";

export function searchProductTest() {
    const term = "Product" + Math.floor(Math.random() * 30000) + 1;
    const limit = 10;
    const offset = 0;

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkMDc0ZDRhLWViY2YtNDEwMi05ZDFjLWRkZTBkYmZiNTI5NSIsIm5hbWUiOiJQZWRybyIsImVtYWlsIjoicGVkcm9AZW1haWwuY29tIiwiaWF0IjoxNzI0ODA0NTYzLCJleHAiOjE3MjQ4OTA5NjN9.BFH3i2zicXKTHKSkdGCE66cO-zvGImJeRxQFuhcMKQU";
    http.get(`${localUrl}/products/search?term=${term}&limit=${limit}&offset=${offset}`, {
        headers: {
            ["Authorization"]: token,
        },
    });

    sleep(1);
}
