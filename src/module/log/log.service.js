import { ObjectId } from "mongodb";
import { databaseConnection } from "../../database/connection.js";

let { client, dbName } = await databaseConnection();

export const insertLog = async (data) => {
    let logData = { ...data };
    if (data.book_id) {
        logData.book_id = new ObjectId(data.book_id);
    }
    let result = await client.db(dbName).collection("logs").insertOne(logData);
    return result;
};
