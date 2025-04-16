import { appLogger } from "@/core/appLogger.js";
import mongoose from "mongoose";
import { appConfig } from "@/config/readers/config.js";


class MongoClient {
    private static instance: MongoClient;
    private isConnected = false;

    private constructor() { }
    public static getInstance(): MongoClient {
        if (!MongoClient.instance) {
            MongoClient.instance = new MongoClient()
        }
        return MongoClient.instance;
    }

    public async connnect(): Promise<void> {
        if (this.isConnected) {
            return;
        }
        try {
            await mongoose.connect(appConfig.db.mongoUri)
            this.isConnected = true;

            appLogger.info("DB", "MongoDB connected successfully");
        } catch (error) {
            appLogger.error("DB", `MongoDB connection error ${error}`);
            process.exit(1)
        }
    }
}
export const mongoClient = MongoClient.getInstance()