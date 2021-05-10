import axios from 'axios';
import { ServiceError, ValidationError } from '../business/errors';
import { Supermarket } from '../business/model/interfaces';

export default async function getSupermarkets(cep: string, supermarketUrl: string) {
  try {
    const pathUrl = `/v1/supermarkets/${cep}`;
    const response = await axios.get<Supermarket[]>(`${supermarketUrl}${pathUrl}`);
    const { data: supermarkets } = response;
    return supermarkets;
  } catch (error) {
    if (error.response.status === 400) {
      throw new ValidationError(error.response.data.message);
    }
    throw new ServiceError('Falha ao consultar o microserviço de supermercados');
  }
}
