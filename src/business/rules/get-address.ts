import getAddressSerice from '../../services/get-address';
import { NotFoundError } from '../errors';

export default async function getAddress(cep: string, token: string, addressUrl: string) {
  const address = await getAddressSerice(cep, token, addressUrl);
  if (!address) {
    throw new NotFoundError('CEP não encontrado');
  }
  return address;
}
