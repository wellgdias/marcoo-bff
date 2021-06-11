/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { Price, ProductCart, Supermarket } from '../../business/model/interfaces';

export default function supermarketsMapper(products: ProductCart[], prices: Price[], supermarkets: Supermarket[]) {
  const supermarketIds = supermarkets.map((supermarket) => supermarket._id);
  const productsIds = products.map((product) => product._id);
  const cartPrices = prices
    .filter((price) => supermarketIds.includes(price.id_supermarket) && productsIds.includes(price.id_product));

  const mappedSupermarkets = supermarkets.map((supermarket) => {
    const pricesSupermarket = cartPrices.filter((price) => price.id_supermarket === supermarket._id);
    const productsSupermarkets = pricesSupermarket.map((price) => products
      .filter((product) => product._id === price.id_product)
      .map((product) => ({
        idProduct: product._id,
        name: product.name,
        amount: product.amountCart,
        price: price.price,
        total: parseFloat((price.price * product.amountCart).toFixed(2)),
      }))[0])
      .sort((current, next) => ((current.idProduct > next.idProduct)
        ? 1 : ((next.idProduct > current.idProduct) ? -1 : 0)));

    return {
      name: supermarket.name,
      total: parseFloat(productsSupermarkets
        .map((product) => product.total)
        .reduce((previous, current) => previous + current)
        .toFixed(2)),
      products: productsSupermarkets,
    };
  });

  const cartProducts = cartPrices.map((cart) => cart.id_product);
  const mappedProducts = products
    .filter((product) => cartProducts.includes(product._id))
    .map((product) => {
      const listPrices = prices
        .filter((price) => price.id_product === product._id)
        .sort((currentPrice, nextPrice) => currentPrice.price - nextPrice.price)
        .map((price) => price.price);

      return {
        idProduct: product._id,
        name: product.name,
        amount: product.amountCart,
        price: listPrices[0],
        total: parseFloat((listPrices[0] * product.amountCart).toFixed(2)),
      };
    })
    .sort((current, next) => ((current.idProduct > next.idProduct)
      ? 1 : ((next.idProduct > current.idProduct) ? -1 : 0)));

  const marcoo = {
    name: 'Marcoo',
    total: parseFloat(mappedProducts
      .map((product) => product.total)
      .reduce((previous, current) => previous + current)
      .toFixed(2)),
    products: mappedProducts,
  };

  mappedSupermarkets.push(marcoo);
  return { supermarkets: mappedSupermarkets.sort((current, next) => current.total - next.total).slice(0, 4) };
}
