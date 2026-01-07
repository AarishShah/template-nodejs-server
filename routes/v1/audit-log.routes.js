import express from "express";
import { AuditLogController } from "../../entities/audit-log/audit-log.controller.js";

const router = express.Router();

router
    .get("/", AuditLogController.getLogs)
    .post("/", AuditLogController.createLog);

export default router;
