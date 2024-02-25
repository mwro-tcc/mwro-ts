import { Env, envSchema } from "../validations/EnvironmentVariables";

/*
 * Returns environment variables in a type-safe way.
 * If .env file is incomplete, it throws an error.
 *
 * */
export const getEnvValues = () => {
    const env = process.env;
    const values = envSchema.passthrough().parse(env);
    return values;
};

// havent found a way to make vitest load .env.test, but for now this works.
export const testEnvValues: Env = {
    NODE_ENV: "test",
    PORT: "3029",
    SECRET: "abcdefg",
    DATABASE_PORT: "5429",
    DATABASE_PASSWORD: "pswd_test",
    DATABASE_USER: "mwro_test",
    DATABASE_HOST: "localhost",
    DATABASE_NAME: "mwro_db_test",
};
