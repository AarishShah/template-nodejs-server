import mongoose from "mongoose";
import { appConfig } from "../config/app-config.js";


export async function connectDatabase() {
    try {
        await mongoose.connect(appConfig.MONGODB_URL, {
            // useNewUrlParser: true, // Deprecated in newer mongoose
            // useUnifiedTopology: true, // Deprecated in newer mongoose
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
