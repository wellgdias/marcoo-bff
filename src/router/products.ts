import { Router } from 'express';
import getProducts from '../business/rules/get-products';
import getProductsByCategory from '../business/rules/get-products-by-category';
import getCheckout from '../business/rules/get-checkout';

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

productRouter.get('/v1/supermarkets/:cep/products/checkout', async (req, res, next) => {
  const { cep } = req.params;
  const { data } = req.body;
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
    const response = await getCheckout(cep, data, servicesUrl);
    res.status(200).json(response);
    return next();
  } catch (error) {
    return next(error);
  }
});

productRouter.get('/v1/supermarkets/:cep/products/categories/:type/:category', async (req, res, next) => {
  const { cep, type, category } = req.params;
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
    const response = await getProductsByCategory(cep, type, category, servicesUrl);
    res.status(200).json(response);
    return next();
  } catch (error) {
    return next(error);
  }
});

export default productRouter;
