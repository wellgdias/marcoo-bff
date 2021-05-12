import axios from 'axios';
import { NotFoundError, ServiceError } from '../business/errors';
import { Product } from '../business/model/interfaces';

export default async function getProductsByCategory(type: string, category: string, productUrl: string) {
  try {
    const pathUrl = `/v1/products?type=${type}&category=${category}`;

    const response = await axios.get<Product[]>(`${productUrl}${pathUrl}`);
    const { data: products } = response;
    return products;
  } catch (error) {
    if (error.response.status === 404) {
      throw new NotFoundError(error.response.data.message);
    }
    throw new ServiceError('Falha ao consultar o microserviço de produtos');
  }
}
