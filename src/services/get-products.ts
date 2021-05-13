import axios from 'axios';
import { ServiceError } from '../business/errors';
import { ProductServiceResponse } from '../business/model/interfaces';

export default async function getProducts(productUrl: string, name?: string) {
  try {
    let pathUrl;
    pathUrl = '/v1/products';

    if (name) {
      pathUrl += `?name=${name}`;
    }

    const response = await axios.get<ProductServiceResponse>(`${productUrl}${pathUrl}`);
    const { data: { data: products } } = response;
    return products;
  } catch (error) {
    throw new ServiceError('Falha ao consultar o microserviço de produtos');
  }
}
