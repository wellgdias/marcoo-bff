/* eslint-disable no-underscore-dangle */
import productsMapper from '../../helpers/product/product.mapper';
import getPrices from '../../services/get-prices';
import getProductsByCategory from '../../services/get-products-by-category';
import getSupermarkets from '../../services/get-supermarkets';
import { ServicesUrl } from '../model/interfaces';

export default async function getAllProducts(cep: string, type: string, category: string, servicesUrl: ServicesUrl) {
  const { supermarketUrl, priceUrl, productUrl } = servicesUrl;
  const supermarkets = await getSupermarkets(cep, supermarketUrl);
  const supermarketIds = supermarkets.map((supermarket) => supermarket._id);

  const prices = await getPrices(supermarketIds, priceUrl);
  const products = await getProductsByCategory(type, category, productUrl);

  return productsMapper(products, prices, supermarkets);
}
