import {
  BusinessPnpg,
  InstitutionsPnpg,
  PartyPnpg,
  PnpgInstitutionLegalAddressResource,
} from '../../model/PartyPnpg';

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
    description: "TOD'S S.P.A",
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b321318-3df7-48c1-87c8-2865e6707c3d',
    digitalAddress: '',
    fiscalCode: '01113570442',
    category: '',
    externalId: '01113570442',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    description: 'DIEGO DELLA VALLE & C. S.R.L.',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '6b11b97c-a659-4f0d-a8cc-316e11b1025f',
    digitalAddress: '',
    fiscalCode: '01501320442',
    category: '',
    externalId: '01501320442',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
];

export const mockedRetrievedInstitutionLegalAddress: Array<PnpgInstitutionLegalAddressResource> = [
  {
    externalInstitutionId: '1',
    address: 'Legal Address API retrieve, 0',
    zipCode: '03040',
  },
  {
    externalInstitutionId: '11111111111',
    address: 'Legal Address API retrieve, 1',
    zipCode: '03040',
  },
  {
    externalInstitutionId: '33333333333',
    address: 'Legal Address API retrieve, 3',
    zipCode: '03040',
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
