import { Router } from 'express';
import healthCheckRouter from './health-check';

export default Router().use(healthCheckRouter);
