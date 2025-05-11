import { z } from "zod"

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)),
    RABBITMQ_URI: z.string().url(),
    MONGO_URI: z.string(),
    X_SIGNATURE: z.string().min(1),
    X_SERVICE_KEY: z.string().min(1),
    ALLOWED_ORIGIN: z.string().url(),
    JWT_SECRET: z.string().min(1),
    CLIENT_URL: z.string().url(),
    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)),
    REDIS_PASSWORD: z.string(),
})
