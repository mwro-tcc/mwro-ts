import { searchProductTest } from "./search-product-test.js";

export const options = {
    vus: 1000,
    duration: "100s",
};

export default function () {
    searchProductTest();
}
