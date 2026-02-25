# Configuration (`src/config`)

The `src/config` folder strictly centralizes environment variables and application-wide settings. 

## Core Practices

1. **`env.js` ensures required variables exist**: Before the app even fully boots, `Config.check()` scans the environment properties. If strictly required variables (`MONGODB_URL`, `PORT`) are missing, it throws a fatal error, preventing the app from starting in a broken state.
2. **`app-config.js` acts as the single source of truth**: No other file in the application should ever read `process.env` directly. Every file should import `appConfig` as a strongly-typed, centralized registry.

## Example

**`src/config/env.js`**
```javascript
const REQUIRED_VARS = ["PORT", "MONGODB_URL"];

export class Config {
    static check() {
        const missing = [];
        for (const varName of REQUIRED_VARS) {
            if (!process.env[varName]) missing.push(varName);
        }
        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
        }
    }

    static get(key, defaultValue) {
        return process.env[key] || defaultValue;
    }
}
```

**`src/config/app-config.js`**
```javascript
import { Config } from "./env.js";

export const appConfig = {
    APP_NAME: "vulnerability-template-server",
    PORT: Config.get("PORT", 20010),
    MONGODB_URL: Config.get("MONGODB_URL")
};
```


---

[⬅️ Previous: Setup](./02-setup.md) | [Next: Models ➡️](./04-models.md)
