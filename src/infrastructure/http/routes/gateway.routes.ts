import { Router } from "express"
import { gatewayController } from "../controllers/gateway.controller.js"
class GatewayRouter {
    private static instance: GatewayRouter
    private readonly router: Router
    private constructor() {
        this.router = Router()
        this.initRoutes()
    }
    private initRoutes() {
        this.router.post('/', gatewayController.createRoute);
        this.router.get('/', gatewayController.getAllRoutes);
        this.router.get('/:serviceName', gatewayController.getRouteByserviceName);
        this.router.put('/:serviceName', gatewayController.updateRoute);
        this.router.delete('/:serviceName', gatewayController.deleteRoute);
    }
    public getRouter() {
        return this.router
    }

    public static getInstance() {
        if (!GatewayRouter.instance) {
            GatewayRouter.instance = new GatewayRouter()
        }
        return GatewayRouter.instance
    }

}
export const gatewayRouter = GatewayRouter.getInstance().getRouter()