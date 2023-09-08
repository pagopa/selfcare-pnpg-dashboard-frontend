import { DashboardApi } from '../api/DashboardApi';
import {
  BaseParty,
  institutionBaseResource2BaseParty,
  institutionResource2Party,
  Party,
} from '../model/Party';
import { mockedBaseInstitutions, mockedInstitutions } from './__mocks__/partyService';

export const fetchParties = (): Promise<Array<BaseParty>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => resolve(mockedBaseInstitutions));
  } else {
    return DashboardApi.getInstitutions().then((institutions) =>
      institutions ? institutions.map(institutionBaseResource2BaseParty) : []
    );
  }
};

export const fetchPartyDetails = (partyId: string): Promise<Party | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    const selectedPartyDetail = mockedInstitutions?.find((p) => p.partyId === partyId) ?? null;
    return new Promise((resolve) => resolve(selectedPartyDetail));
  } else {
    return DashboardApi.getInstitution(partyId).then((institutionResource) =>
      institutionResource ? institutionResource2Party(institutionResource) : null
    );
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
