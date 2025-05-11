import mongoose, { Schema } from 'mongoose';
import type { IRoute } from '@/domain/interfaces/IRoute.js';
const routesSchema: Schema = new Schema<IRoute>(
  {
    serviceName: { type: String, required: true, unique: true },
    baseRoute: { type: String, required: true, unique: true },
    targetUrl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

export const RouteModel = mongoose.model<IRoute>('Route', routesSchema);
