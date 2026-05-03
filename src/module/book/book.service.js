import { databaseConnection } from "../../database/connection.js";

let { client, dbName } = await databaseConnection();

export const insertBook = async (data) => {
    let result = await client.db(dbName).collection("books").insertOne(data);
    return result;
};

export const insertBooks = async (data) => {
    let result = await client.db(dbName).collection("books").insertMany(data);
    return result;
};

export const updateBookByTitle = async (title, updates) => {
    let result = await client.db(dbName).collection("books").updateOne(
        { title },
        { $set: updates }
    );
    return result;
};

export const findBookByTitle = async (title) => {
    let result = await client.db(dbName).collection("books").findOne({ title });
    return result;
};

export const findBooksByYearRange = async (from, to) => {
    let result = await client.db(dbName).collection("books").find({
        year: { $gte: parseInt(from), $lte: parseInt(to) }
    }).toArray();
    return result;
};

export const findBooksByGenre = async (genre) => {
    let result = await client.db(dbName).collection("books").find({ genres: genre }).toArray();
    return result;
};

export const findBooksSkipLimit = async () => {
    let result = await client.db(dbName).collection("books").find()
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray();
    return result;
};

export const findBooksYearInteger = async () => {
    let result = await client.db(dbName).collection("books").find({
        year: { $type: "number" }
    }).toArray();
    return result;
};

export const findBooksExcludeGenres = async () => {
    let result = await client.db(dbName).collection("books").find({
        genres: { $nin: ["Horror", "Science Fiction"] }
    }).toArray();
    return result;
};

export const deleteBooksBefore = async (year) => {
    let result = await client.db(dbName).collection("books").deleteMany({
        year: { $lt: parseInt(year) }
    });
    return result;
};

export const aggregateBooks1 = async () => {
    let result = await client.db(dbName).collection("books").aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } }
    ]).toArray();
    return result;
};

export const aggregateBooks2 = async () => {
    let result = await client.db(dbName).collection("books").aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } }
    ]).toArray();
    return result;
};

export const aggregateBooks3 = async () => {
    let result = await client.db(dbName).collection("books").aggregate([
        { $unwind: "$genres" },
        { $project: { _id: 0, title: 1, genres: 1 } }
    ]).toArray();
    return result;
};

export const aggregateBooks4 = async () => {
    let result = await client.db(dbName).collection("logs").aggregate([
        {
            $lookup: {
                from: "books",
                localField: "book_id",
                foreignField: "_id",
                as: "book_details"
            }
        },
        {
            $project: {
                _id: 0,
                action: 1,
                "book_details.title": 1,
                "book_details.author": 1,
                "book_details.year": 1
            }
        }
    ]).toArray();
    return result;
};
