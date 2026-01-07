import express from "express";
import { RemediationController } from "../../controllers/remediation.controller.js";
import { validate } from "../../middlewares/validate.js";
import { remediationValidation } from "../../validations/remediation.validations.js";
const router = express.Router();

router
    .post("/",
        validate(remediationValidation.createRemediation, "body"),
        RemediationController.createRemediation
    )
    .get("/:vulnId", RemediationController.getRemediations);

export default router;
