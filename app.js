import express from 'express';
import dotenv from 'dotenv';
import { Config } from "./config/env.js";
import { appConfig } from "./config/app-config.js";
import { setupApp } from "./setup/setup.js";
import { connectDatabase } from "./database/connection.js";

dotenv.config();

Config.check();

const app = express();

connectDatabase();

setupApp(app, Config);

const PORT = appConfig.PORT;

app.listen(PORT, () => {
    console.log(`Vulnerability Template Server is running on port ${PORT}`);
});
