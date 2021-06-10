/* eslint-disable no-underscore-dangle */
import productsMapper from '../../helpers/mappers/product-mapper';
import getPrices from '../../services/get-prices';
import getProducts from '../../services/get-products';
import getSupermarkets from '../../services/get-supermarkets';
import { ServicesUrl } from '../model/interfaces';

export default async function getAllProducts(cep: string, servicesUrl: ServicesUrl, name?: string) {
  const { supermarketUrl, priceUrl, productUrl } = servicesUrl;
  const supermarkets = await getSupermarkets(cep, supermarketUrl);
  const supermarketIds = supermarkets.map((supermarket) => supermarket._id);

  const prices = await getPrices(supermarketIds, priceUrl);
  const products = await getProducts(productUrl, name);

  return productsMapper(products, prices, supermarkets);
}
