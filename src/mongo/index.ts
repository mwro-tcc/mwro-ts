import { Db, MongoClient } from "mongodb";
import { getEnvValues } from "../constants/EnvironmentVariables";
import { logger } from "../services/logger/logger";

// Connection URL
const envValues = getEnvValues();
const url = `mongodb://${envValues.MONGO_USER}:${envValues.MONGO_PASSWORD}@${envValues.MONGO_HOST}:${envValues.MONGO_PORT}`;
const client = new MongoClient(url);

let db: Db | null = null;

export async function connectToMongo() {
    if (db) return db;

    await client.connect();
    db = client.db(envValues.MONGO_DATABASE);
    return db;
}
