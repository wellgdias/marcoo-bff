/* eslint-disable no-underscore-dangle */
import supermarketsMapper from '../../helpers/mappers/supermarket-mapper';
import getPrices from '../../services/get-prices';
import getProductsById from '../../services/get-products-by-id';
import getSupermarkets from '../../services/get-supermarkets';
import { InfoCart, ServicesUrl } from '../model/interfaces';

export default async function getCheckout(cep: string, productsCart: InfoCart[], servicesUrl: ServicesUrl) {
  const { supermarketUrl, priceUrl, productUrl } = servicesUrl;

  const productsIds = productsCart.map((product) => product.idProduct);
  const products = await getProductsById(productsIds, productUrl);
  const productsChechout = products.map((product) => ({
    ...product,
    amountCart: productsCart
      .filter((productCart) => productCart.idProduct === product._id)
      .map((productCart) => productCart.amount)[0],
  }));

  const supermarkets = await getSupermarkets(cep, supermarketUrl);
  const supermarketIds = supermarkets.map((supermarket) => supermarket._id);
  const prices = await getPrices(supermarketIds, priceUrl);

  return supermarketsMapper(productsChechout, prices, supermarkets);
}
