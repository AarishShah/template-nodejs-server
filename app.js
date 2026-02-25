import 'dotenv/config';

import express from 'express';
import { Config } from "./src/config/env.js";
import { appConfig } from "./src/config/app-config.js";
import { setupApp } from "./src/setup/setup.js";
import { connectDatabase } from "./src/database/connection.js";

Config.check();

const app = express();

connectDatabase();

setupApp(app, Config);

const PORT = appConfig.PORT;

app.listen(PORT, () => {
    console.log(`[SYSTEM] - Vulnerability Template Server is running on port ${PORT}`);
});
