import {
  BusinessPnpg,
  institutionPnPGResource2PartyPnpg,
  InstitutionsPnpg,
  PartyPnpg,
} from '../../model/PartyPnpg';
import { PnPGInstitutionResource } from '../generated/b4f-dashboard-pnpg/PnPGInstitutionResource';
import {
  ProductOnBoardingStatusEnum,
  ProductsResource,
  StatusEnum,
} from '../generated/b4f-dashboard-pnpg/ProductsResource';

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

export const mockedPnPGInstitutionsResource: Array<PnPGInstitutionResource> = [
  {
    userRole: 'ADMIN',
    name: 'mockedBusiness1',
    status: 'ACTIVE',
    id: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    fiscalCode: '01113570210',
    mailAddress: 'mockemail1@mocktest.com',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    name: 'mockedBusiness2',
    status: 'ACTIVE',
    id: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    fiscalCode: '03343570210',
    mailAddress: 'mockemail2@mocktest.com',
    category: '',
    externalId: '03343570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    name: 'mockedBusiness3',
    status: 'ACTIVE',
    id: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    fiscalCode: '05923570210',
    mailAddress: 'mockemail3@mocktest.com',
    category: '',
    externalId: '05923570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    name: 'mockedBusiness4',
    status: 'ACTIVE',
    id: '5b971318-3df7-11c1-67c8-1111e6707dgt',
    fiscalCode: '05923570510',
    mailAddress: 'mockemail4@mocktest.com',
    category: '',
    externalId: '05923570510',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
];

export const mockedProductResources: Array<ProductsResource> = [
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    title: 'SEND',
    description: 'Descrizione SEND',
    id: 'prod-pn-pg',
    authorized: true,
    status: StatusEnum.ACTIVE,
    productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    title: 'SEND ambiente sviluppo',
    description: 'SEND ambiente sviluppo',
    id: 'prod-pn-pg-svil',
    authorized: true,
    status: StatusEnum.ACTIVE,
    productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    title: 'SEND ambiente collaudo',
    description: 'SEND ambiente collaudo',
    id: 'prod-pn-pg-coll',
    authorized: true,
    status: StatusEnum.ACTIVE,
    productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
  },
];

export const DashboardApi = {
  fetchParties: async (): Promise<Array<PartyPnpg>> =>
    new Promise((resolve) =>
      resolve(mockedPnPGInstitutionsResource.map(institutionPnPGResource2PartyPnpg))
    ),

  retrieveProductBackoffice: async (
    _productId: string,
    _institutionId: string,
    _environment?: string
  ): Promise<string> => new Promise((resolve) => resolve('mockedUrl')),

  saveInstitutionLogo: async (_institutionId: string, _logo: File): Promise<boolean> =>
    new Promise((resolve) => resolve(true)),
};
