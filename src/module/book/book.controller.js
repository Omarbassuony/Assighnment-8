import { Router } from "express";
import {
    insertBook,
    insertBooks,
    updateBookByTitle,
    findBookByTitle,
    findBooksByYearRange,
    findBooksByGenre,
    findBooksSkipLimit,
    findBooksYearInteger,
    findBooksExcludeGenres,
    deleteBooksBefore,
    aggregateBooks1,
    aggregateBooks2,
    aggregateBooks3,
    aggregateBooks4
} from "./book.service.js";

const router = Router();

router.post("/books", async (req, res) => {
    try {
        const result = await insertBook(req.body);
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.post("/books/batch", async (req, res) => {
    try {
        const result = await insertBooks(req.body);
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.patch("/books/:title", async (req, res) => {
    try {
        const result = await updateBookByTitle(req.params.title, req.body);
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/title", async (req, res) => {
    try {
        const book = await findBookByTitle(req.query.title);
        if (!book) return res.status(404).json({ message: "Book not found." });
        return res.json(book);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/year", async (req, res) => {
    try {
        const { from, to } = req.query;
        const books = await findBooksByYearRange(parseInt(from), parseInt(to));
        return res.json(books);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/genre", async (req, res) => {
    try {
        const books = await findBooksByGenre(req.query.genre);
        return res.json(books);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/skip-limit", async (req, res) => {
    try {
        const books = await findBooksSkipLimit();
        return res.json(books);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/year-integer", async (req, res) => {
    try {
        const books = await findBooksYearInteger();
        return res.json(books);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/exclude-genres", async (req, res) => {
    try {
        const books = await findBooksExcludeGenres();
        return res.json(books);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.delete("/books/before-year", async (req, res) => {
    try {
        const result = await deleteBooksBefore(parseInt(req.query.year));
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/aggregate1", async (req, res) => {
    try {
        const result = await aggregateBooks1();
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/aggregate2", async (req, res) => {
    try {
        const result = await aggregateBooks2();
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/aggregate3", async (req, res) => {
    try {
        const result = await aggregateBooks3();
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.get("/books/aggregate4", async (req, res) => {
    try {
        const result = await aggregateBooks4();
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

export default router;
