import { DashboardApi } from '../api/DashboardApi';
import { Party } from '../model/Party';
import { Product } from '../model/Product';
import { ENV } from '../utils/env';

export const retrieveBackOfficeUrl = (
  selectedParty: Party,
  product: Product,
  environment?: string
): Promise<string> => {
  if (ENV.USER.ENABLE_USER_V2) {
    return DashboardApi.retrieveProductBackofficeV2(product.id, selectedParty.partyId, environment);
  }
  return DashboardApi.retrieveProductBackoffice(product.id, selectedParty.partyId, environment);
};
