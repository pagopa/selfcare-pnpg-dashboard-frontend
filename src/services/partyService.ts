import { DashboardPnpgApi } from '../api/DashboardPnpgApiClient';
import { mockedPnPGInstitutionsResource } from '../api/__mocks__/DashboardPnpgApiClient';
import { institutionPnPGResource2PartyPnpg, PartyPnpg } from '../model/PartyPnpg';

export const fetchParties = (): Promise<Array<PartyPnpg>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) =>
      resolve(mockedPnPGInstitutionsResource.map(institutionPnPGResource2PartyPnpg))
    );
  } else {
    return DashboardPnpgApi.fetchParties().then((institutions) =>
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
    const selectedPartyDetail =
      mockedPnPGInstitutionsResource
        .map(institutionPnPGResource2PartyPnpg)
        .find((p) => p.partyId === partyId || p.externalId === partyId) ?? null;
    return new Promise((resolve) => resolve(selectedPartyDetail));
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

export const updateBusinessName = (
  institutionId: string,
  businessName: string
): Promise<boolean> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve(true));
  } else {
    return DashboardPnpgApi.updateBusinessName(institutionId, businessName);
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
