import { InstitutionBaseResource } from '../generated/b4f-dashboard-pnpg/InstitutionBaseResource';
import { InstitutionResource } from '../generated/b4f-dashboard-pnpg/InstitutionResource';
import { ProductOnBoardingStatusEnum } from '../generated/b4f-dashboard-pnpg/OnboardedProductResource';
import {
  ProductRoleMappingsResource,
  SelcRoleEnum,
} from '../generated/b4f-dashboard-pnpg/ProductRoleMappingsResource';
import { ProductsResource, StatusEnum } from '../generated/b4f-dashboard-pnpg/ProductsResource';

export const mockedInstitutionResources: Array<InstitutionResource> = [
  {
    id: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    name: 'mockedBusiness1',
    fiscalCode: '01113570210',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
    institutionType: 'PG',
    mailAddress: 'emailmock1@testmock.com',
    products: [
      {
        productId: 'prod-pn-pg',
        authorized: true,
        userRole: 'ADMIN',
        productOnBoardingStatus: 'ACTIVE' as ProductOnBoardingStatusEnum,
        billing: {
          publicServices: false,
          recipientCode: 'CC2345',
          vatNumber: '01113570210',
        },
      },
    ],
  },
  {
    id: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    name: 'mockedBusiness2',
    fiscalCode: '03343570210',
    category: '',
    externalId: '03343570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
    institutionType: 'PG',
    mailAddress: 'emailmock2@testmock.com',
    products: [
      {
        productId: 'prod-pn-pg',
        authorized: true,
        userRole: 'ADMIN',
        productOnBoardingStatus: 'ACTIVE' as ProductOnBoardingStatusEnum,
        billing: {
          publicServices: false,
          recipientCode: 'CC236D',
          vatNumber: '03343570210',
        },
      },
    ],
  },
  {
    id: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    name: 'mockedBusiness3',
    fiscalCode: '05923570210',
    category: '',
    externalId: '05923570210',
    originId: 'originId1',
    origin: 'ADE',
    institutionType: 'PG',
    mailAddress: 'emailmock3@testmock.com',
    products: [
      {
        productId: 'prod-pn-pg',
        authorized: true,
        userRole: 'ADMIN',
        productOnBoardingStatus: 'ACTIVE' as ProductOnBoardingStatusEnum,
        billing: {
          publicServices: false,
          recipientCode: 'CC293D',
          vatNumber: '05923570210',
        },
        userProductActions: ['UpdateInstitution'],
      },
    ],
  },
  {
    id: '5b971318-3df7-11c1-67c8-1111e6707dgt',
    name: 'mockedBusiness4',
    fiscalCode: '05923570510',
    category: '',
    externalId: '05923570510',
    originId: 'originId1',
    origin: 'ADE',
    institutionType: 'PG',
    mailAddress: 'emailmock4@testmock.com',
    products: [
      {
        productId: 'prod-pn-pg',
        authorized: true,
        userRole: 'ADMIN',
        productOnBoardingStatus: 'ACTIVE' as ProductOnBoardingStatusEnum,
        billing: {
          publicServices: false,
          recipientCode: 'CC133D',
          vatNumber: '05923570510',
        },
      },
    ],
  },
];

export const mockedProductResources: Array<ProductsResource> = [
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    title: 'SEND',
    description: 'Descrizione SEND',
    id: 'prod-pn-pg',
    status: StatusEnum.ACTIVE,
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
    status: StatusEnum.ACTIVE,
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
    status: StatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
  },
];

export const mockedProductRoles: Array<ProductRoleMappingsResource> = [
  {
    partyRole: 'SUB_DELEGATE',
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
    partyRole: 'OPERATOR',
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
  getInstitutions: async (): Promise<Array<InstitutionBaseResource>> =>
    new Promise((resolve) => resolve(mockedInstitutionResources)),

  getInstitution: async (_partyId: string): Promise<InstitutionResource> =>
    new Promise((resolve) => resolve(mockedInstitutionResources[0])),

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
