import mongoose from "mongoose";

const remediationSchema = new mongoose.Schema({
    vulnerabilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vulnerability', required: true },
    strategy: { type: String, required: true },
    estimatedEffort: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export const Remediation = mongoose.model("Remediation", remediationSchema);
