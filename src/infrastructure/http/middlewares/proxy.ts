import type { Express, Request, Response } from 'express';
import type { ClientRequest } from 'http';
import { createProxyMiddleware, type Options } from 'http-proxy-middleware';
import { appLogger } from '@/shared/observability/logger/appLogger.js';
import type { IRoute } from '@/domain/interfaces/IRoute.js';
import type { IncomingMessage, ServerResponse } from 'http';
import { appConfig } from '@/config/readers/appConfig.js';

export const registerProxyServices = async (
    app: Express,
    services: Partial<IRoute>[]
) => {
    services.forEach((service: Partial<IRoute>) => {
        try {
            let { baseRoute = '', targetUrl = '', serviceName } = service;

            if (!baseRoute.startsWith('/')) {
                baseRoute = '/' + baseRoute;
            }

            const proxyOptions: Options = {
                target: targetUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: (path: string) => `/api${path}`,
                on: {
                    proxyReq: (proxyReq: ClientRequest, req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
                        proxyReq.setHeader('x-service', appConfig.auth.xServiceKey);
                    },
                    proxyRes: (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {

                    },

                }
            };
            app.use(baseRoute, createProxyMiddleware(proxyOptions));
            appLogger.info("proxy", `Registered ${serviceName} at ${baseRoute} → ${targetUrl}`);

        } catch (error) {
            appLogger.error("proxy", `Error in Proxying - ${error}`);
        }
    });
};