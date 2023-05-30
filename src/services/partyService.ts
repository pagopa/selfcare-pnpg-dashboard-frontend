import { DashboardApi } from '../api/DashboardApi';
import { mockedInstitutionsResource } from '../api/__mocks__/DashboardApi';
import { institutionResource2Party, Party } from '../model/Party';

export const fetchParties = (): Promise<Array<Party>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) =>
      resolve(mockedInstitutionsResource.map(institutionResource2Party))
    );
  } else {
    return DashboardApi.getInstitutions().then((institutions) =>
      institutions ? institutions.map(institutionResource2Party) : []
    );
  }
};

export const fetchPartyDetails = (
  partyId: string,
  parties?: Array<Party>
): Promise<Party | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    const selectedPartyDetail =
      mockedInstitutionsResource
        .map(institutionResource2Party)
        .find((p) => p.partyId === partyId || p.externalId === partyId) ?? null;
    return new Promise((resolve) => resolve(selectedPartyDetail));
  } else {
    return retrieveParty_fetch(partyId, parties);
  }
};

const retrieveParty_fetch = (partyId: string, parties?: Array<Party>): Promise<Party | null> => {
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
