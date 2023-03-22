import { DashboardPnpgApi } from '../api/DashboardPnpgApiClient';
import { mockedPnPGInstitutionsResource } from '../api/__mocks__/DashboardPnpgApiClient';
import { institutionPnPGResource2PartyPnpg, PartyPnpg } from '../model/PartyPnpg';

export const getPnPGInstitutions = (): Promise<Array<PartyPnpg>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve(mockedPnPGInstitutionsResource));
  } else {
    return DashboardPnpgApi.getPnPGInstitutions().then((institutions) =>
      institutions ? institutions.map(institutionPnPGResource2PartyPnpg) : []
    );
  }
};

export const fetchPartyDetails = (
  partyId: string,
  parties?: Array<PartyPnpg>
): Promise<PartyPnpg | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTIES === 'true') {
    return new Promise((resolve) =>
      resolve(
        mockedPnPGInstitutionsResource.find(
          (p) => p.partyId === partyId || p.externalId === partyId
        ) ?? null
      )
    );
  }
  return retrieveParty(partyId, parties);
};

const retrieveParty = (
  partyId: string,
  parties: Array<PartyPnpg> | undefined
): Promise<PartyPnpg | null> => {
  const selectedParty = parties?.find((p) => p.partyId === partyId || p.externalId === partyId);
  if (selectedParty) {
    return new Promise((resolve) => resolve(selectedParty));
  } else {
    return new Promise((resolve) => resolve(null));
  }
};

export const retrieveProductBackoffice = (
  productId: string,
  institutionId: string,
  environment?: string
): Promise<string> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve('dummyUrl'));
  } else {
    return DashboardPnpgApi.retrieveProductBackoffice(productId, institutionId, environment);
  }
};

export const saveInstitutionLogo = (institutionId: string, logo: File): Promise<boolean> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve(true));
  } else {
    return DashboardPnpgApi.saveInstitutionLogo(institutionId, logo);
  }
};
