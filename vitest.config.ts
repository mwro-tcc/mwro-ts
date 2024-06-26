import { defineConfig } from "vitest/config";
import { testEnvValues } from "./src/constants/EnvironmentVariables";

export default defineConfig({
    test: {
        env: testEnvValues,
    },
});
