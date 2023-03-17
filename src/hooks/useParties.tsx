import useReduxCachedValue from '@pagopa/selfcare-common-frontend/hooks/useReduxCachedValue';
import { PartyPnpg } from '../model/PartyPnpg';
import { partiesActions, partiesSelectors } from '../redux/slices/partiesSlice';
import { getPnPGInstitutions } from '../services/partyService';

export const useParties = (): (() => Promise<Array<PartyPnpg>>) =>
  useReduxCachedValue(
    'PARTIES',
    getPnPGInstitutions,
    partiesSelectors.selectPartiesList,
    partiesActions.setPartiesList
  );
