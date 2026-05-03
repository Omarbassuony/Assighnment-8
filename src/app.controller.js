import express from "express";
import collectionRouter from "./module/collection/collection.controller.js";
import bookRouter from "./module/book/book.controller.js";
import logRouter from "./module/log/log.controller.js";

export const bootstrap = () => {
    const app = express();

    app.use(express.json());

    app.use(collectionRouter);
    app.use(bookRouter);
    app.use(logRouter);

    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
};
