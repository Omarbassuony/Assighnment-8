import { Router } from "express";
import {
    createBooksCollection,
    createAuthorsCollection,
    createLogsCappedCollection,
    createBooksIndex
} from "./collection.service.js";

const router = Router();

router.post("/collection/books", async (req, res) => {
    try {
        await createBooksCollection();
        return res.json({ ok: 1 });
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.post("/collection/authors", async (req, res) => {
    try {
        const result = await createAuthorsCollection(req.body);
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.post("/collection/logs/capped", async (req, res) => {
    try {
        await createLogsCappedCollection();
        return res.json({ ok: 1 });
    } catch (error) {
        return res.json({ message: error.message });
    }
});

router.post("/collection/books/index", async (req, res) => {
    try {
        const result = await createBooksIndex();
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

export default router;
