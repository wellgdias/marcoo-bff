import { Router } from 'express';
import getProducts from '../business/rules/get-products';

const productRouter = Router();
productRouter.get('/v1/supermarkets/:cep/products', async (req, res, next) => {
  const { cep } = req.params;
  const { name } = req.query;
  const {
    config: {
      services: {
        supermarket: {
          url: supermarketUrl,
        },
        product: {
          url: productUrl,
        },
        price: {
          url: priceUrl,
        },
      },
    },
  } = res.app.locals;

  const servicesUrl = {
    supermarketUrl,
    productUrl,
    priceUrl,
  };

  try {
    const response = await getProducts(cep, servicesUrl, name?.toString());
    res.status(200).json(response);
    return next();
  } catch (error) {
    return next(error);
  }
});

export default productRouter;
