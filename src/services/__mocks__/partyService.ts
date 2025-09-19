import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { ProductOnBoardingStatusEnum } from '../../api/generated/b4f-dashboard-pnpg/OnboardedProductResource';
import { BaseParty, Party } from '../../model/Party';

export const mockedBaseInstitutions: Array<BaseParty> = [
  {
    partyId: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    description: 'mockedBusiness1',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    description: 'mockedBusiness2',
    status: 'ACTIVE',
    userRole: 'LIMITED',
  },
  {
    partyId: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    description: 'mockedBusiness3',
    status: 'ACTIVE',
    userRole: 'ADMIN',
  },
  {
    partyId: '5b971318-3df7-11c1-67c8-1111e6707dgt',
    description: 'mockedBusiness4',
    status: 'ACTIVE',
    userRole: 'LIMITED',
  },
];

export const mockedInstitutions: Array<Party> = [
  {
    partyId: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    description: 'mockedBusiness1',
    fiscalCode: '01113570210',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
    institutionType: 'Azienda privata',
    digitalAddress: 'emailmock1@testmock.com',
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
        userProductActions: [
          Actions.UploadLogo,
          Actions.ManageProductGroups,
          Actions.ListProductGroups,
          Actions.CreateProductUsers,
          Actions.ListProductUsers,
          Actions.DeleteProductUsers,
          Actions.UpdateProductUsers,
        ],
      },
    ],
  },
  {
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    description: 'mockedBusiness2',
    fiscalCode: '03343570210',
    category: '',
    externalId: '03343570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
    institutionType: 'Azienda privata',
    digitalAddress: 'emailmock2@testmock.com',
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
        userProductActions: [
          Actions.UploadLogo,
          Actions.ManageProductGroups,
          Actions.ListProductGroups,
          Actions.CreateProductUsers,
          Actions.ListProductUsers,
          Actions.DeleteProductUsers,
          Actions.UpdateProductUsers,
        ],
      },
    ],
  },
  {
    partyId: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    description: 'mockedBusiness3',
    fiscalCode: '05923570210',
    category: '',
    externalId: '05923570210',
    originId: 'originId1',
    origin: 'ADE',
    institutionType: 'Azienda privata',
    digitalAddress: 'emailmock3@testmock.com',
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
        userProductActions: [
          Actions.UploadLogo,
          Actions.ManageProductGroups,
          Actions.CreateProductUsers,
          Actions.ListProductUsers,
          Actions.DeleteProductUsers,
          Actions.UpdateProductUsers,
        ],
      },
    ],
  },
  {
    partyId: '5b971318-3df7-11c1-67c8-1111e6707dgt',
    description: 'mockedBusiness4',
    fiscalCode: '05923570510',
    category: '',
    externalId: '05923570510',
    originId: 'originId1',
    origin: 'ADE',
    institutionType: 'Azienda privata',
    digitalAddress: 'emailmock4@testmock.com',
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
        userProductActions: [
          Actions.UploadLogo,
          Actions.ManageProductGroups,
          Actions.CreateProductUsers,
          Actions.ListProductUsers,
          Actions.DeleteProductUsers,
          Actions.UpdateProductUsers,
        ],
      },
    ],
  },
];

export const verifyFetchPartiesMockExecution = (parties: Array<Party>) => {
  expect(parties).toStrictEqual(mockedInstitutions);
};

export const fetchParties = () => new Promise((resolve) => resolve(mockedInstitutions));

export const verifyFetchPartyDetailsMockExecution = (party: Party) => {
  expect(party).toStrictEqual(mockedInstitutions.find((p) => p.partyId === party.partyId));
};

export const fetchPartyDetails = (
  partyId: string,
  _parties?: Array<Party>
): Promise<Party | null> =>
  new Promise((resolve) => resolve(mockedInstitutions.find((p) => p.partyId === partyId) ?? null));
