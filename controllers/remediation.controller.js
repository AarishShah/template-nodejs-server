import { RemediationService } from "../services/remediation.service.js";
import { catchError } from "../errors/catch-error.js";
import { ApiResponse } from "../utils/api-response.js";

export class RemediationController {

    static createRemediation = catchError(async (req, res, next) => {
        const data = await RemediationService.createRemediation(req.body);
        return ApiResponse.created(res, { data }, "Remediation created successfully");
    });

    static getRemediations = catchError(async (req, res, next) => {
        const { vulnId } = req.params;
        const data = await RemediationService.getRemediationsForVuln(vulnId);
        return ApiResponse.success(res, { data }, "Remediations fetched successfully");
    });
}
