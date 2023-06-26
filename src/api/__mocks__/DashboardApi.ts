import { institutionResource2Party } from '../../model/Party';
import { PnPGInstitutionResource } from '../generated/b4f-dashboard-pnpg/PnPGInstitutionResource';
import {
  PartyRoleEnum,
  ProductRoleMappingsResource,
  SelcRoleEnum,
} from '../generated/b4f-dashboard-pnpg/ProductRoleMappingsResource';
import {
  ProductOnBoardingStatusEnum,
  ProductsResource,
  StatusEnum,
} from '../generated/b4f-dashboard-pnpg/ProductsResource';

export const mockedInstitutionsResource: Array<PnPGInstitutionResource> = [
  {
    userRole: 'LIMITED',
    name: 'mockedBusiness1',
    status: 'ACTIVE',
    id: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    fiscalCode: '01113570210',
    mailAddress: 'mockemail1@mocktest.com',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
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
    origin: 'INFOCAMERE',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'LIMITED',
    name: 'mockedBusiness3',
    status: 'ACTIVE',
    id: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    fiscalCode: '05923570210',
    mailAddress: 'mockemail3@mocktest.com',
    category: '',
    externalId: '05923570210',
    originId: 'originId1',
    origin: 'ADE',
    institutionType: 'Azienda privata',
  },
];

export const mockedInstitutionsResource2Party =
  mockedInstitutionsResource.map(institutionResource2Party);

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

export const mockedProductRoles: Array<ProductRoleMappingsResource> = [
  {
    partyRole: PartyRoleEnum.SUB_DELEGATE,
    selcRole: SelcRoleEnum.ADMIN,
    multiroleAllowed: false,
    productRoles: [
      {
        code: 'pg-admin',
        description: 'Stipula il contratto e identifica gli amministratori',
        label: 'Amministratore',
      },
    ],
  },
  {
    partyRole: PartyRoleEnum.OPERATOR,
    selcRole: SelcRoleEnum.LIMITED,
    multiroleAllowed: false,
    productRoles: [
      {
        code: 'pg-operator',
        description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
        label: 'Tecnico',
      },
    ],
  },
];

export const DashboardApi = {
  getInstitutions: async (): Promise<Array<PnPGInstitutionResource>> =>
    new Promise((resolve) => resolve(mockedInstitutionsResource)),

  getInstitution: async (_partyId: string): Promise<PnPGInstitutionResource> =>
    new Promise((resolve) => resolve(mockedInstitutionsResource[0])),

  updateBusinessData: async (
    _institutionId: string,
    _digitalAddress?: string,
    _businessName?: string
  ): Promise<boolean> => new Promise((resolve) => resolve(true)),

  getProducts: async (): Promise<Array<ProductsResource>> =>
    new Promise((resolve) => resolve(mockedProductResources)),

  getProductRoles: async (_productId: string): Promise<Array<ProductRoleMappingsResource>> =>
    new Promise((resolve) => resolve(mockedProductRoles)),

  retrieveProductBackoffice: async (
    _productId: string,
    _institutionId: string,
    _environment?: string
  ): Promise<string> => new Promise((resolve) => resolve('https://hostname/path?id=DUMMYTOKEN')),

  saveInstitutionLogo: async (_institutionId: string, _logo: File): Promise<boolean> =>
    new Promise((resolve) => resolve(true)),
};
