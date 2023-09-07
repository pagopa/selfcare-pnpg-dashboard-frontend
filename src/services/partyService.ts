import { DashboardApi } from '../api/DashboardApi';
import { BaseParty, institutionResource2Party, Party } from '../model/Party';
import { mockedBaseInstitutions, mockedInstitutions } from './__mocks__/partyService';

export const fetchParties = (): Promise<Array<BaseParty>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve(mockedBaseInstitutions));
  } else {
    return DashboardApi.getInstitutions().then((institutions) =>
      institutions ? institutions.map(institutionResource2Party) : []
    );
  }
};

export const fetchPartyDetails = (
  partyId: string,
  parties?: Array<BaseParty>
): Promise<Party | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    const selectedPartyDetail =
      mockedInstitutions?.find((p) => p.partyId === partyId || p.externalId === partyId) ?? null;
    return new Promise((resolve) => resolve(selectedPartyDetail));
  } else {
    return retrieveParty_fetch(partyId, parties);
  }
};

const retrieveParty_fetch = (
  partyId: string,
  parties?: Array<BaseParty>
): Promise<Party | null> => {
  const matchedPartyId = parties?.find((p) => p.partyId === partyId || p.externalId === partyId);
  if (matchedPartyId) {
    return DashboardApi.getInstitution(matchedPartyId?.partyId).then((institutionResource) =>
      institutionResource ? institutionResource2Party(institutionResource) : null
    );
  } else {
    return new Promise((resolve) => resolve(null));
  }
};

export const updateBusinessData = (
  institutionId: string,
  businessEmail?: string,
  businessName?: string
): Promise<boolean> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve(true));
  } else {
    return DashboardApi.updateBusinessData(institutionId, businessEmail, businessName);
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
    return DashboardApi.retrieveProductBackoffice(productId, institutionId, environment);
  }
};

export const saveInstitutionLogo = (institutionId: string, logo: File): Promise<boolean> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve(true));
  } else {
    return DashboardApi.saveInstitutionLogo(institutionId, logo);
  }
};
