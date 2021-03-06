import joi from 'joi';
import { name, version } from '../../package.json';

export default joi
  .object({
    NODE_ENV: joi.string().lowercase().valid('local', 'test', 'development', 'production').required(),
    PORT: joi.string().required(),
    APPLICATION_NAME: joi.string().default(name),
    APPLICATION_VERSION: joi.string().default(version),
    SUPERMARKET_SERVICE: joi.string().required(),
    PRODUCT_SERVICE: joi.string().required(),
    PRICE_SERVICE: joi.string().required(),
    CEP_SERVICE: joi.string().required(),
    AUTHORIZATION_TOKEN: joi.string().required(),
  })
  .unknown()
  .required();
