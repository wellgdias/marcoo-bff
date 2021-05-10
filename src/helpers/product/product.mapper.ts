/* eslint-disable no-underscore-dangle */
import { Price, Product, Supermarket } from '../../business/model/interfaces';

export default function productsMapper(products: Product[], prices: Price[], supermarkets: Supermarket[]) {
  return products.map((product) => ({
    ...product,
    prices:
      prices
        .filter((price) => price.id_product === product._id)
        .sort((currentPrice, nextPrice) => currentPrice.price - nextPrice.price)
        .map((price) => ({
          _id: price._id,
          id_supermarket: price.id_supermarket,
          name: supermarkets
            .filter((supermarket) => supermarket._id === price.id_supermarket)
            .map((supermarket) => supermarket.name)[0],
          price: price.price,
        })),
  }));
}
