import { Remediation } from "../models/remediation.model.js";

export class RemediationService {

    static createRemediation = async (data) => {
        const remediation = new Remediation(data);
        await remediation.save();
        return remediation;
    }

    static getRemediationsForVuln = async (vulnerabilityId) => {
        return Remediation.find({ vulnerabilityId });
    }
}
