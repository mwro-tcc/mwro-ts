import { defineConfig } from "vitest/config";
import { testEnvValues } from "./src/constants/EnvironmentVariables";

export default defineConfig({
    test: {
        poolOptions: {
            threads: {
                singleThread: true,
            },
        },
        env: testEnvValues,
    },
});
