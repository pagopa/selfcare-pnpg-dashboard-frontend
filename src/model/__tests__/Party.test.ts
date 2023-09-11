import {
  InstitutionResource,
  InstitutionTypeEnum,
} from '../../api/generated/b4f-dashboard-pnpg/InstitutionResource';
import { ProductOnBoardingStatusEnum } from '../../api/generated/b4f-dashboard-pnpg/OnboardedProductResource';
import { institutionResource2Party, Party } from '../Party';

test('Test Party', () => {
  const party: Party = {
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    partyId: '44444444444',
    institutionType: 'GSP',
    description: 'BusinessName',
    recipientCode: 'MDSSFDF',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    userRole: undefined,
    zipCode: undefined,
    urlLogo: 'http://checkout.selfcare/institutions/44444444444/logo.png',
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
  };

  expect(party).toStrictEqual({
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    partyId: '44444444444',
    institutionType: 'GSP',
    description: 'BusinessName',
    recipientCode: 'MDSSFDF',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    userRole: undefined,
    zipCode: undefined,
    urlLogo: 'http://checkout.selfcare/institutions/44444444444/logo.png',
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
  });
});

test('Test institutionResource2Party', () => {
  const institutionResource: InstitutionResource = {
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    institutionType: 'PG' as InstitutionTypeEnum,
    id: '44444444444',
    name: 'BusinessName',
    recipientCode: 'MDSSFDF',
    address: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    mailAddress: undefined,
    zipCode: undefined,
    aooParentCode: undefined,
    parentDescription: '',
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
    subunitCode: undefined,
    subunitType: undefined,
    supportContact: undefined,
    vatNumber: undefined,
    vatNumberGroup: undefined,
  };

  const party = institutionResource2Party(institutionResource);
  expect(party).toStrictEqual({
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    institutionType: 'PG' as InstitutionTypeEnum,
    partyId: '44444444444',
    description: 'BusinessName',
    recipientCode: 'MDSSFDF',
    registeredOffice: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    digitalAddress: undefined,
    zipCode: '',
    aooParentCode: undefined,
    parentDescription: '',
    urlLogo: 'http://checkout.selfcare/institutions/44444444444/logo.png',
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
    subunitCode: undefined,
    subunitType: undefined,
    supportEmail: undefined,
    vatNumber: undefined,
    vatNumberGroup: undefined,
    typology: 'TODO',
  });
});
