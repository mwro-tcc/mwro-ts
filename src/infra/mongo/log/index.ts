import { Db, ObjectId } from "mongodb";

import { ILogAdapter } from "./interface";
import { connectToMongo } from "../../../mongo";

class LogAdapter implements ILogAdapter {
    constructor() {}
    async write(data: any): Promise<void> {
        const conn = await connectToMongo();

        await conn
            .collection("logs")
            .insertOne({ _id: new ObjectId(), createdAt: new Date().toISOString(), data });
    }
}

export function makeLogAdapter() {
    return new LogAdapter();
}
