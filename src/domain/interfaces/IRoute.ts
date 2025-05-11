export interface IRoute {
  serviceName: string;
  baseRoute: string;
  targetUrl: string;
  isAuthRequired: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
