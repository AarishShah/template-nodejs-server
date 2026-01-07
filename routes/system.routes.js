import express from "express";
import { healthRateLimiter } from "../utils/rate-limiter.js";

const router = express.Router();

// Apply 1 second rate limit specific to health
router.get('/health', healthRateLimiter, (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Vulnerability Template Server is running' });
});

export default router;
