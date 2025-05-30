import { env } from "./env.js";
import { defaultConfig } from "../constants/defaultConfig.js";
import type { IAppConfig } from "../types/IAppConfig.js";
class AppConfig {
    private static instance: AppConfig;
    public config: IAppConfig
    private constructor() {
        this.config = JSON.parse(JSON.stringify(defaultConfig))
        this.setAppConfig()
        this.setAuthConfig()
        this.setDBConfig()
        this.setMQConfig()
    }
    public static getInstance() {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig()
        }
        return AppConfig.instance
    }
    private setAppConfig(): void {
        this.config.app.port = env.PORT;
        this.config.app.nodeEnv = env.NODE_ENV;
    }

    private setDBConfig(): void {
        this.config.db.redisHost = env.REDIS_HOST;
        this.config.db.redisPort = env.REDIS_PORT;
        this.config.db.redisPassword = env.REDIS_PASSWORD;
        this.config.db.mongoUri=env.MONGO_URI
    }
    private setMQConfig() {
        this.config.mq.rabbitUri = env.RABBITMQ_URI;

    }
    private setAuthConfig(): void {
        this.config.auth.xSignatureKey = env.X_SIGNATURE;
        this.config.auth.xServiceKey = env.X_SERVICE_KEY;
        this.config.auth.jwtSecret = env.JWT_SECRET;
        this.config.app.allowedOrigin = env.ALLOWED_ORIGIN;
        this.config.auth.clientUrl = env.CLIENT_URL;
    }

}

export const appConfig = AppConfig.getInstance().config
