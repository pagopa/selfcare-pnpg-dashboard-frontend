import { fetchParties, fetchPartyDetails } from '../partyService';
import { institutionResource2Party, Party } from '../../model/Party';
import { DashboardApi } from '../../api/DashboardApi';
import {
  mockedInstitutionsResource,
  mockedInstitutionsResource2Party,
} from '../../api/__mocks__/DashboardApi';

jest.mock('../../api/DashboardApi');

let dashboardApiGetInstitutionSpy;
let dashboardApiGetInstitutionsSpy;

beforeEach(() => {
  dashboardApiGetInstitutionSpy = jest.spyOn(DashboardApi, 'getInstitution');
  dashboardApiGetInstitutionsSpy = jest.spyOn(DashboardApi, 'getInstitutions');
});

test('Test fetchParties', async () => {
  const parties = await fetchParties();

  expect(parties).toMatchObject(mockedInstitutionsResource.map(institutionResource2Party));

  parties.forEach((p) =>
    expect(p.urlLogo).toBe(`http://checkout.selfcare/institutions/${p.partyId}/logo.png`)
  );

  expect(dashboardApiGetInstitutionsSpy).toBeCalledTimes(1);
});

describe('Test fetchPartyDetails', () => {
  const expectedPartyId: string = '5b321318-3df7-48c1-67c8-1111e6707c3d';

  const checkSelectedParty = (party: Party) => {
    expect(party).toMatchObject(institutionResource2Party(mockedInstitutionsResource[0]));

    expect(party.urlLogo).toBe(`http://checkout.selfcare/institutions/${expectedPartyId}/logo.png`);
  };

  const checkDashboardInvocation = (expectedCallsNumber: number) => {
    expect(DashboardApi.getInstitution).toBeCalledTimes(expectedCallsNumber);
    if (expectedCallsNumber > 0) {
      expect(DashboardApi.getInstitution).toBeCalledWith(expectedPartyId);
    }
  };

  test('Test no parties as cache', async () => {
    const party = await fetchPartyDetails(expectedPartyId, mockedInstitutionsResource2Party);
    console.log('party: ', party);
    if (party) {
      checkSelectedParty(party);
    }

    checkDashboardInvocation(1);
  });

  test('Test parties as cache', async () => {
    const parties = mockedInstitutionsResource.map(institutionResource2Party);
    const party = await fetchPartyDetails(expectedPartyId, parties);
    if (party) {
      checkSelectedParty(party);
    }

    checkDashboardInvocation(1);

    const partialParties = parties.filter((p) => p.partyId === expectedPartyId);
    const party2 = await fetchPartyDetails(expectedPartyId, partialParties);
    expect(party2).toStrictEqual(party);

    checkDashboardInvocation(2);
  });
});
