import axios from 'axios';
import { ServiceError } from '../business/errors';
import { PriceResponse } from '../business/model/interfaces';

export default async function getPrices(supermarketIds : string[], priceUrl: string) {
  try {
    const pathUrl = '/v1/prices';
    const response = await axios.get<PriceResponse>(`${priceUrl}${pathUrl}`, { data: { data: supermarketIds } });
    const { data: { data: prices } } = response;
    return prices;
  } catch (error) {
    throw new ServiceError('Falha ao consultar o microserviço de preços');
  }
}
