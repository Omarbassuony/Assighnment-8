import { databaseConnection } from "../../database/connection.js";

let { client, dbName } = await databaseConnection();

export const createBooksCollection = async () => {
    let result = await client.db(dbName).createCollection("books", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    title: { bsonType: "string", minLength: 1 }
                }
            }
        }
    });
    return result;
};

export const createAuthorsCollection = async (data) => {
    let result = await client.db(dbName).collection("authors").insertOne(data);
    return result;
};

export const createLogsCappedCollection = async () => {
    let result = await client.db(dbName).createCollection("logs", {
        capped: true,
        size: 1048576
    });
    return result;
};

export const createBooksIndex = async () => {
    let result = await client.db(dbName).collection("books").createIndex({ title: 1 });
    return result;
};
