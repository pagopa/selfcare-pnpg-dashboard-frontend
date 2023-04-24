import { PnPGInstitutionResource } from '../../api/generated/b4f-dashboard-pnpg/PnPGInstitutionResource';
import { InstitutionTypeEnum } from '../../api/generated/b4f-dashboard-pnpg/InstitutionResource';
import { institutionPnPGResource2PartyPnpg, PartyPnpg } from '../PartyPnpg';

test('Test Party', () => {
  const party: PartyPnpg = {
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    id: '44444444444',
    institutionType: 'GSP',
    mailAddress: undefined,
    name: 'BusinessName',
    recipientCode: 'MDSSFDF',
    status: 'TestStatus1',
    address: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    userRole: undefined,
    zipCode: undefined,
    urlLogo: 'http://checkout.selfcare/institutions/44444444444/logo.png',
  };

  expect(party).toStrictEqual({
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    id: '44444444444',
    institutionType: 'GSP',
    mailAddress: undefined,
    name: 'BusinessName',
    recipientCode: 'MDSSFDF',
    status: 'TestStatus1',
    address: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    userRole: undefined,
    zipCode: undefined,
    urlLogo: 'http://checkout.selfcare/institutions/44444444444/logo.png',
  });
});

test('Test institutionResource2Party', () => {
  const institutionResource: PnPGInstitutionResource = {
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    institutionType: 'GSP',
    id: '44444444444',
    mailAddress: undefined,
    name: 'BusinessName',
    recipientCode: 'MDSSFDF',
    status: 'TestStatus1',
    address: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    userRole: undefined,
    zipCode: undefined,
  };

  const party = institutionPnPGResource2PartyPnpg(institutionResource);
  expect(party).toStrictEqual({
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    institutionType: 'GSP',
    partyId: '44444444444',
    digitalAddress: undefined,
    description: 'BusinessName',
    recipientCode: 'MDSSFDF',
    status: 'TestStatus1',
    address: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    urlLogo: 'http://checkout.selfcare/institutions/44444444444/logo.png',
    userRole: undefined,
    zipCode: undefined,
  });
});
