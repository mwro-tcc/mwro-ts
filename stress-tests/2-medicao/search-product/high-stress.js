import { searchProductTest } from "./search-product-test.js";

export const options = {
    vus: 10000,
    duration: "180s",
};

export default function () {
    searchProductTest();
}
