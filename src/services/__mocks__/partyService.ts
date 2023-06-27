import { Party } from '../../model/Party';

export const mockedInstitutions: Array<Party> = [
  {
    userRole: 'LIMITED',
    description: 'mockedBusiness1',
    status: 'ACTIVE',
    partyId: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    fiscalCode: '01113570210',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
    institutionType: 'Azienda privata',
    mailAddress: 'emailmock1@testmock.com',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness2',
    status: 'ACTIVE',
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    fiscalCode: '03343570210',
    category: '',
    externalId: '03343570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
    institutionType: 'Azienda privata',
    mailAddress: 'emailmock2@testmock.com',
  },
  {
    userRole: 'LIMITED',
    description: 'mockedBusiness3',
    status: 'ACTIVE',
    partyId: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    fiscalCode: '05923570210',
    category: '',
    externalId: '05923570210',
    originId: 'originId1',
    origin: 'ADE',
    institutionType: 'Azienda privata',
    mailAddress: 'emailmock3@testmock.com',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness4',
    status: 'ACTIVE',
    partyId: '5b971318-3df7-11c1-67c8-1111e6707dgt',
    fiscalCode: '05923570510',
    category: '',
    externalId: '05923570510',
    originId: 'originId1',
    origin: 'ADE',
    institutionType: 'Azienda privata',
    mailAddress: 'emailmock4@testmock.com',
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
