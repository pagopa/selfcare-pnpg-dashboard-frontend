import { PartyPnpg } from '../../model/PartyPnpg';

export const mockedPnpgParties: Array<PartyPnpg> = [
  {
    externalId: '1',
    fiscalCode: '1',
    geographicTaxonomies: [{ code: '', desc: '' }],
    partyId: '1',
    institutionType: 'GSP',
    digitalAddress: undefined,
    description: 'Test businessName 01',
    recipientCode: 'MDSSFDF',
    status: 'TestStatus1',
    address: 'LegalAddressTest1',
    category: 'categoryTest1',
    origin: 'originTest1',
    originId: 'originIdTest1',
    userRole: 'ADMIN',
    zipCode: undefined,
    urlLogo: 'http://checkout.selfcare/institutions/00000000000/logo.png',
  },
  {
    externalId: '11111111111',
    fiscalCode: '11111111111',
    geographicTaxonomies: [{ code: '', desc: '' }],
    partyId: '11111111111',
    institutionType: 'GSP',
    digitalAddress: undefined,
    description: 'Test businessName 02',
    recipientCode: 'MDSSFDF',
    status: 'TestStatus2',
    address: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    userRole: undefined,
    zipCode: undefined,
    urlLogo: 'http://checkout.selfcare/institutions/11111111111/logo.png',
  },
  {
    externalId: '44444444444',
    fiscalCode: '44444444444',
    geographicTaxonomies: [{ code: '', desc: '' }],
    partyId: '44444444444',
    institutionType: 'GSP',
    digitalAddress: undefined,
    description: 'Test businessName 03',
    recipientCode: 'MDSSFDF',
    status: 'TestStatus1',
    address: 'LegalAddressTest2',
    category: 'categoryTest2',
    origin: 'originTest2',
    originId: 'originIdTest2',
    userRole: undefined,
    zipCode: undefined,
    urlLogo: 'http://checkout.selfcare/institutions/44444444444/logo.png',
  },
];

export const verifyFetchPartiesMockExecution = (parties: Array<PartyPnpg>) => {
  expect(parties).toStrictEqual(mockedPnpgParties);
};

export const fetchParties = () => new Promise((resolve) => resolve(mockedPnpgParties));

export const verifyFetchPartyDetailsMockExecution = (party: PartyPnpg) => {
  expect(party).toStrictEqual(mockedPnpgParties.filter((p) => p.partyId === party.partyId)[0]);
};

export const fetchPartyDetails = (
  partyId: string,
  _parties?: Array<PartyPnpg>
): Promise<PartyPnpg | null> =>
  new Promise((resolve) => resolve(mockedPnpgParties.find((p) => p.partyId === partyId) ?? null));
