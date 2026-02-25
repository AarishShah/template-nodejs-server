
const REQUIRED_VARS = ["PORT", "MONGODB_URL"];

export class Config {

    static check() {
        const missing = [];
        for (const varName of REQUIRED_VARS) {
            if (!process.env[varName]) {
                missing.push(varName);
            }
        }
        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
        }
    }

    static get(key, defaultValue) {
        return process.env[key] || defaultValue;
    }
}
