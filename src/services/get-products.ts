import axios from 'axios';
import { NotFoundError, ServiceError } from '../business/errors';
import { Product } from '../business/model/interfaces';

export default async function getProducts(productUrl: string, name?: string) {
  try {
    let pathUrl;
    pathUrl = '/v1/products';

    if (name) {
      pathUrl += `?name=${name}`;
    }

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
