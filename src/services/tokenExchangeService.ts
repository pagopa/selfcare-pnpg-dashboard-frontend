import { DashboardApi } from '../api/DashboardApi';
import { Party } from '../model/Party';
import { Product } from '../model/Product';

export const retrieveBackOfficeUrl = (
  selectedParty: Party,
  product: Product,
  environment?: string
): Promise<string> =>
  DashboardApi.retrieveProductBackoffice(product.id, selectedParty.partyId, environment);
