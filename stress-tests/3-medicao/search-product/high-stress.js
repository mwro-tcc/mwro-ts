import { searchProductTest } from "./search-product-test.js";

export const options = {
    vus: 500,
    duration: "180s",
};

export default function () {
    searchProductTest();
}
