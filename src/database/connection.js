import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "bookstore";

export const databaseConnection = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    return { client, dbName };
};
