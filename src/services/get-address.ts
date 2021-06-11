import axios from 'axios';
import { ServiceError } from '../business/errors';
import { Address } from '../business/model/interfaces';

export default async function getAddress(cep : string, token: string, addressUrl: string) {
  try {
    const urlPath = `/cep?cep=${cep}`;
    const response = await axios.get<Address>(`${addressUrl}${urlPath}`, { headers: { Authorization: token } });
    const { data: address } = response;

    return address;
  } catch (error) {
    throw new ServiceError(`Falha ao consultar o endereço a partir do CEP: ${cep}`);
  }
}
