import axios from 'axios';
import { NotFoundError, ServiceError } from '../business/errors';
import { ProductServiceResponse } from '../business/model/interfaces';

export default async function getProductsById(productsIds: string[], productUrl: string) {
  try {
    const pathUrl = '/v1/products/id';
    const response = await axios.get<ProductServiceResponse>(`${productUrl}${pathUrl}`,
      { data: { products: productsIds } });
    const { data: { data: products } } = response;
    return products;
  } catch (error) {
    if (error.response.status === 404) {
      throw new NotFoundError(error.response.data.message);
    }
    throw new ServiceError('Falha ao consultar o microserviço de produtos');
  }
}
