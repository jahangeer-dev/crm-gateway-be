import { AsyncHandler } from '../middlewares/asyncHandler.js';
import type { Request, Response } from 'express';
import {
  CreatedResponse,
  SuccessResponse,
  NotFoundResponse
} from '../responses/ApiResponse.js';
import { GatewayUseCase } from '@/application/gateway/useCases/Gateway.usecase.js';
class GatewayController {
  private readonly gatewayUseCase = new GatewayUseCase();

  public createRoute = AsyncHandler(async (req: Request, res: Response) => {

    const route = await this.gatewayUseCase.createRoute(req.body);
    return new CreatedResponse('', route).send(res);
  });

  public getAllRoutes = AsyncHandler(async (req: Request, res: Response) => {
    const routes = await this.gatewayUseCase.getAllRoutes();
    return new SuccessResponse('', routes).send(res);
  });

  public getRouteByserviceName = AsyncHandler(
    async (req: Request, res: Response) => {
      const route = await this.gatewayUseCase.getRouteByserviceName(
        req.params.serviceName ?? ''
      );
      if (!route) {
        return new NotFoundResponse('Service not found').send(res);
      }
      return new SuccessResponse('', route).send(res);
    }
  );

  public updateRoute = AsyncHandler(async (req: Request, res: Response) => {
    const route = await this.gatewayUseCase.updateRoute(
      req.params.serviceName ?? '',
      req.body
    );
    if (!route) {
      return new NotFoundResponse('Service not found').send(res);
    }
    return new SuccessResponse('', route).send(res);
  });

  public deleteRoute = AsyncHandler(async (req: Request, res: Response) => {
    const route = await this.gatewayUseCase.deleteRoute(
      req.params.serviceName ?? ''
    );
    if (!route) {
      return new NotFoundResponse('Service not found').send(res);
    }
    return new SuccessResponse('Service deleted successfully').send(res);
  });
}

export const gatewayController = new GatewayController();
