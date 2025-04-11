import { json } from "stream/consumers";
import _ from "lodash"
import type { IAppConfig } from "../types/IAppConfig.js";
import { env } from "./envValidator.js"
import { defaultConfig } from "../constants/defaultConfig.js";
class Config {
    private static instance: Config;
    public config: IAppConfig;
    private constructor() {
        this.config = JSON.parse(JSON.stringify(defaultConfig))

        this.setAppConfig();
        this.setAuthConfig();
        this.setDBConfig();
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    private setAppConfig(): void {
        this.config.app.port = env.PORT;
        this.config.app.nodeEnv = env.NODE_ENV;
    }

    private setDBConfig(): void {
        this.config.db.mongoUri = env.MONGODB_URI;
        this.config.db.redisHost = env.REDIS_HOST;
        this.config.db.redisPort = env.REDIS_PORT;
        this.config.db.redisPassword = env.REDIS_PASSWORD;
    }

    private setAuthConfig(): void {
        this.config.auth.xSignatureKey = env.X_SIGNATURE;
        this.config.auth.xServiceKey = env.X_SERVICE_KEY;
    }
}

export const appConfig = Config.getInstance().config;
