import { fetchParties, fetchPartyDetails, updateBusinessData } from '../partyService';
import {
  institutionBaseResource2BaseParty,
  institutionResource2Party,
  Party,
} from '../../model/Party';
import { DashboardApi } from '../../api/DashboardApi';
import { mockedInstitutionResources } from '../../api/__mocks__/DashboardApi';

jest.mock('../../api/DashboardApi');

let dashboardApiGetInstitutionSpy;
let dashboardApiGetInstitutionsSpy;
let dashboardApiUpdateBusinessDataSpy;

beforeEach(() => {
  dashboardApiGetInstitutionSpy = jest.spyOn(DashboardApi, 'getInstitution');
  dashboardApiGetInstitutionsSpy = jest.spyOn(DashboardApi, 'getInstitutions');
  dashboardApiUpdateBusinessDataSpy = jest.spyOn(DashboardApi, 'updateBusinessData');
});

test('Test fetchParties', async () => {
  const parties = await fetchParties();

  expect(parties).toMatchObject(mockedInstitutionResources.map(institutionBaseResource2BaseParty));

  parties.forEach((p) =>
    expect(p.urlLogo).toBe(`http://checkout.selfcare/institutions/${p.partyId}/logo.png`)
  );

  expect(dashboardApiGetInstitutionsSpy).toBeCalledTimes(1);
});

describe('Test fetchPartyDetails', () => {
  const expectedPartyId: string = '5b321318-3df7-48c1-67c8-1111e6707c3d';

  const checkSelectedParty = (party: Party) => {
    expect(party).toMatchObject(institutionResource2Party(mockedInstitutionResources[0]));

    expect(party.urlLogo).toBe(`http://checkout.selfcare/institutions/${expectedPartyId}/logo.png`);
  };

  const checkDashboardInvocation = (expectedCallsNumber: number) => {
    expect(DashboardApi.getInstitution).toBeCalledTimes(expectedCallsNumber);
    if (expectedCallsNumber > 0) {
      expect(DashboardApi.getInstitution).toBeCalledWith(expectedPartyId);
    }
  };

  test('Test no parties as cache', async () => {
    const party = await fetchPartyDetails(expectedPartyId);
    if (party) {
      checkSelectedParty(party);
    }

    checkDashboardInvocation(1);
  });

  test('Test parties as cache', async () => {
    const parties = mockedInstitutionResources.map(institutionResource2Party);
    const party = await fetchPartyDetails(expectedPartyId);
    if (party) {
      checkSelectedParty(party);
    }

    checkDashboardInvocation(1);

    const partialParties = parties.filter((p) => p.partyId === expectedPartyId);
    const party2 = await fetchPartyDetails(expectedPartyId);
    expect(party2).toStrictEqual(party);

    checkDashboardInvocation(2);
  });

  test('Test updateBusinessData api: update the email', async () => {
    const institutionId = mockedInstitutionResources.map(institutionResource2Party)[1].partyId;
    const newEmail = 'mockemail@mocktest.com';

    const businessUpdatedSuccessfully = await updateBusinessData(institutionId, newEmail);
    expect(businessUpdatedSuccessfully).toBeTruthy();

    expect(dashboardApiUpdateBusinessDataSpy).toBeCalledTimes(1);
  });

  test('Test updateBusinessData api: update the businessName', async () => {
    const institutionId = mockedInstitutionResources.map(institutionResource2Party)[3].partyId;
    const newEmail = 'mockemail@mocktest.com';

    const businessUpdatedSuccessfully = await updateBusinessData(institutionId, newEmail);
    expect(businessUpdatedSuccessfully).toBeTruthy();

    expect(dashboardApiUpdateBusinessDataSpy).toBeCalledTimes(1);
  });
});
