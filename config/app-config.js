import { Config } from "./env.js";

export const appConfig = {
    APP_NAME: "vulnerability-template-server",
    APP_VERSION: "1.0.0",
    NODE_ENV: Config.get("NODE_ENV", "development"),

    PORT: Config.get("PORT", 3000),

    MONGODB_URL: Config.get("MONGODB_URL")
};
