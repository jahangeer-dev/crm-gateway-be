
import { RouteModel } from '@/infrastructure/database/mongo/schema/routesModel.js';
import { NotFoundError } from '@/shared/utils/errors/ApiError.js';
import type { IRoute } from '@/domain/interfaces/IRoute.js';
import _ from 'lodash';

export class GatewayUseCase {
  async createRoute(routeData: IRoute) {
    const newRoute = new RouteModel(routeData).save();
    return newRoute;
  }

  getServices = async () => {
    const services: Partial<IRoute>[] = [];
    const routes = await RouteModel.find()
      .select({ serviceName: 1, baseRoute: 1, targetUrl: 1, isAuthRequired: 1 })
      .lean()
      .exec();
    if (routes) {
      services.push(...routes);
    }
    return services;
  };

  async getAllRoutes() {
    return await RouteModel.find({ isDeleted: false }).lean().exec();
  }

  async getRouteByserviceName(serviceName: string) {
    return await RouteModel.findOne({ serviceName: serviceName }).lean().exec();
  }

  async updateRoute(serviceName: string, routeData: Partial<IRoute>) {
    const existingRoute = await RouteModel.findOne({ serviceName })
      .lean()
      .exec();

    if (!existingRoute) {
      throw new NotFoundError('Route not found');
    }
    _.merge(existingRoute, routeData);
    return await RouteModel.findOneAndUpdate({ serviceName }, existingRoute, {
      new: true
    })
      .lean()
      .exec();
  }

  async deleteRoute(serviceName: string) {
    return await RouteModel.findOneAndUpdate(
      { serviceName },
      { isDeleted: true },
      { new: true }
    )
      .lean()
      .exec();
  }
}
