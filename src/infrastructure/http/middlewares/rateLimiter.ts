import type { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 1000,
    keyGenerator: (req: Request, res: Response) =>
        req.clientIp ?? req.ip ?? 'unknown',
    message: 'Too many requests from this IP, please try again later.'
});
