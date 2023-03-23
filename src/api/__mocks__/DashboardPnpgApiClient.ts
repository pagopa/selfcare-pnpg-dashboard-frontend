import { BusinessPnpg, InstitutionsPnpg, PartyPnpg } from '../../model/PartyPnpg';

export const mockedAgencies: Array<BusinessPnpg> = [
  {
    businessName: 'Ragione Sociale success',
    businessTaxId: '1',
  },
  {
    businessName: 'Ragione Sociale alreadyOnboarded',
    businessTaxId: '11111111111',
  },
  {
    businessName: 'Ragione Sociale genericError',
    businessTaxId: '22222222222',
  },
];

export const mockedAgenciesAfterInsertingTaxCode: Array<BusinessPnpg> = [
  {
    businessName: '',
    businessTaxId: '33333333333',
  },
];

export const mockedInstitutionPnPG: InstitutionsPnpg = {
  businesses: mockedAgencies,
  legalTaxId: '1234567',
  requestDateTime: 'x',
};

export const mockedPnPGInstitutionsResource: Array<PartyPnpg> = [
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness1',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    digitalAddress: '',
    fiscalCode: '01113570210',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness2',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    digitalAddress: '',
    fiscalCode: '03343570210',
    category: '',
    externalId: '03343570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness3',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    digitalAddress: '',
    fiscalCode: '05923570210',
    category: '',
    externalId: '05923570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness4',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b971318-3df7-11c1-67c8-1111e6707dgt',
    digitalAddress: '',
    fiscalCode: '05923570510',
    category: '',
    externalId: '05923570510',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
];

export const DashboardApi = {
  getPnPGInstitutions: async (): Promise<Array<PartyPnpg>> =>
    new Promise((resolve) => resolve(mockedPnPGInstitutionsResource)),

  retrieveProductBackoffice: async (
    _productId: string,
    _institutionId: string,
    _environment?: string
  ): Promise<string> => new Promise((resolve) => resolve('mockedUrl')),

  saveInstitutionLogo: async (_institutionId: string, _logo: File): Promise<boolean> =>
    new Promise((resolve) => resolve(true)),
};
