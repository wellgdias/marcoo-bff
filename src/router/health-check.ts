/* eslint-disable prefer-promise-reject-errors */
import { Router, RequestHandler, Request } from 'express';
import { healthServices } from '../helpers/health-services';
import createHealthCheck from '../middlewares/health-check';

const healthCheckRouter = Router();

const getServicesHealth: RequestHandler = async (req, res, next) => {
  const { config } = req.app.locals;

  req.app.locals.healthServices = await healthServices([
    { name: 'Supermarket Service', url: config.services.supermarket.url },
    { name: 'Product Service', url: config.services.product.url },
    { name: 'Price Service', url: config.services.price.url },
  ]);

  return next();
};

const getCollectedHealthResults = (req: Request) => req.app.locals.healthServices;

healthCheckRouter.get('/', getServicesHealth, createHealthCheck(getCollectedHealthResults));

export default healthCheckRouter;
