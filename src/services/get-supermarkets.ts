import axios from 'axios';
import { NotFoundError, ServiceError, ValidationError } from '../business/errors';
import { SupermarketResponse } from '../business/model/interfaces';

export default async function getSupermarkets(cep: string, supermarketUrl: string) {
  try {
    const pathUrl = `/v1/supermarkets/${cep}`;
    const response = await axios.get<SupermarketResponse>(`${supermarketUrl}${pathUrl}`);
    const { data: { data: supermarkets } } = response;
    return supermarkets;
  } catch (error) {
    if (error.response.status === 400) {
      throw new ValidationError(error.response.data.message);
    }
    if (error.response.status === 404) {
      throw new NotFoundError(error.response.data.message);
    }
    throw new ServiceError('Falha ao consultar o microserviço de supermercados');
  }
}
