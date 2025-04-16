import { Redis } from "ioredis"
import {appLogger} from "@/core/appLogger.js"
import { appConfig } from "@/config/readers/config.js"

class RedisClient{
    private static instance:RedisClient;
    
}