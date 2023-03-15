import { PartyPnpg } from '../../model/PartyPnpg';
import { Product } from '../../model/Product';

export const retrieveBackOfficeUrl = (
  _selectedParty: PartyPnpg,
  _product: Product,
  _environment: string
): Promise<string> => new Promise((resolve) => resolve('https://hostname/path?id=DUMMYTOKEN'));
