
const REQUIRED_VARS = ["PORT", "MONGODB_URL"];

export class Config {

    static check() {
        const missing = REQUIRED_VARS.filter(key => !process.env[key]);
        if (missing.length > 0) {
            console.warn(`Warning: Missing environment variables: ${missing.join(", ")}. Using defaults where possible.`);
        }
    }

    static get(key) {
        return process.env[key];
    }
}
