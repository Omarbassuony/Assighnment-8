import { Router } from "express";
import { insertLog } from "./log.service.js";

const router = Router();

router.post("/logs", async (req, res) => {
    try {
        const result = await insertLog(req.body);
        return res.json(result);
    } catch (error) {
        return res.json({ message: error.message });
    }
});

export default router;
