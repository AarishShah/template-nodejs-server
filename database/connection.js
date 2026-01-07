import mongoose from "mongoose";
import { Config } from "../config/env.js";


export async function connectDatabase() {
    try {
        await mongoose.connect(Config.get("MONGODB_URL"), {
            // useNewUrlParser: true, // Deprecated in newer mongoose
            // useUnifiedTopology: true, // Deprecated in newer mongoose
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
