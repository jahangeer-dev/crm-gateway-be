import { appLogger } from "@/shared/observability/logger/appLogger.js";
import { appConfig } from "@/config/readers/appConfig.js";
import express, { type Express } from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { morganMiddleware } from "@/shared/observability/logger/httpLogger.js";
import { indexRouter } from "./routes/index.route.js";
import cors from "cors";
import { mongoClient } from "../database/mongo/mongoClient.js";
import { redisClient } from "../database/redis/redisClient.js";
import { allowedHeaders } from "@/config/constants/aallowedHeaders.js";
import requestIp from 'request-ip';
import helmet from 'helmet';
import compression from 'compression';
import { GatewayUseCase } from "@/application/gateway/useCases/Gateway.usecase.js";
import { registerProxyServices } from "./middlewares/proxy.js";
class Server {
    private static instance: Server;
    private readonly app: Express
    private readonly gatewayUsecase: GatewayUseCase;

    private constructor() {
        this.gatewayUsecase = new GatewayUseCase();

        this.app = express()
    }

    private async initDependencies() {
        await mongoClient.connect()
        await redisClient.connect()
    }

    public static getInstance() {
        if (!Server.instance) {
            Server.instance = new Server()
        }
        return Server.instance
    }
    public async init() {
        this.initDependencies().then(async () => {
            this.handleMiddleWares();
            const services = await this.gatewayUsecase.getServices();
            await registerProxyServices(this.app, services);
            this.handleProcessSignals();
            this.handleRoutes();
            this.handleErrors();
            this.listen();
        })
    }
    private handleMiddleWares() {
        this.app.set('trust proxy', true);
        this.app.use(requestIp.mw());
        this.app.use(morganMiddleware)
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(compression());
        cors({
            origin: appConfig.app.allowedOrigin,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: allowedHeaders,
            credentials: true
        })
    }

    private handleRoutes() {

        this.app.use("/api", indexRouter)

    }
    private handleErrors(): void {
        this.app.use(errorHandler);
    }

    private handleProcessSignals(): void {
        process.on('SIGTERM', () => {
            appLogger.info("redis", "Successfully disconnected.");
            appLogger.info('event ', 'SIGTERM received. Shutting down gracefully.');
            process.exit();
        });

        process.on('SIGINT', () => {
            appLogger.info("redis", "Successfully disconnected.");
            appLogger.info(
                'event ', 'SIGINT (Ctrl+C) received. Shutting down gracefully.'
            );
            process.exit();
        });

        process.on('uncaughtException', (err: Error) => {
            appLogger.error('process ', `Uncaught exception: ${err.message}`);
        });

    }
    private listen() {
        this.app.listen(appConfig.app.port, () => {
            appLogger.info("server", `App is running at ${appConfig.app.port}`)
        })
    }
}


export const server = Server.getInstance()



