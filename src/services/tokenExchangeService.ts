import { DashboardPnpgApi } from '../api/DashboardPnpgApiClient';
import { PartyPnpg } from '../model/PartyPnpg';
import { Product } from '../model/Product';

export const retrieveBackOfficeUrl = (
  selectedParty: PartyPnpg,
  product: Product,
  environment?: string
): Promise<string> =>
  DashboardPnpgApi.retrieveProductBackoffice(product.id, selectedParty.partyId, environment);
