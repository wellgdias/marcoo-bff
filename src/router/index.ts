import { Router } from 'express';
import healthCheckRouter from './health-check';
import productRouter from './products';

export default Router().use(healthCheckRouter).use(productRouter);
