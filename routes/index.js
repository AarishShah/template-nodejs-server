import express from "express";

import { authenticateService } from "../middlewares/auth.js";

import vulnerabilities from "./v1/vulnerability.routes.js";
import remediations from "./v1/remediation.routes.js";
import { vulnLimiter, remediationLimiter } from "../utils/rate-limiter.js";

export const router = express.Router();

router.use(authenticateService());

router
    .use("/v1/vulnerabilities", vulnLimiter, vulnerabilities)
    .use("/v1/remediations", remediationLimiter, remediations);
