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
