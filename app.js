import express from 'express';
import dotenv from 'dotenv';
import { Config } from "./config/env.js";
import { setupApp } from "./setup/setup.js";
import { connectDatabase } from "./database/connection.js";

dotenv.config();

Config.check();

const app = express();

connectDatabase();

setupApp(app, Config);

const PORT = Config.get("PORT") || 3000;

app.listen(PORT, () => {
    console.log(`Vulnerability Template Server is running on port ${PORT}`);
});
