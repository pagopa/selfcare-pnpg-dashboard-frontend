import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockedInstitutionResources } from '../../api/__mocks__/DashboardApi';
import {
  institutionBaseResource2BaseParty,
  institutionResource2Party,
  Party,
} from '../../model/Party';
import { fetchParties, fetchPartyDetails, updateBusinessData } from '../partyService';

vi.mock('../../api/DashboardApi');

let dashboardApiGetInstitutionSpy: ReturnType<typeof vi.spyOn>;
let dashboardApiGetInstitutionsSpy: ReturnType<typeof vi.spyOn>;
let dashboardApiUpdateBusinessDataSpy: ReturnType<typeof vi.spyOn>;
const apiModule = await import('../../api/DashboardApi');
beforeEach(() => {
  // Spy on DashboardApi methods and mock their return values
  dashboardApiGetInstitutionSpy = vi.spyOn(apiModule.DashboardApi, 'getInstitution')
    .mockResolvedValue(mockedInstitutionResources[0]);
  dashboardApiGetInstitutionsSpy = vi
    .spyOn(apiModule.DashboardApi, 'getInstitutions')
    .mockResolvedValue(mockedInstitutionResources);
  dashboardApiUpdateBusinessDataSpy = vi
    .spyOn(apiModule.DashboardApi, 'updateBusinessData')
    .mockResolvedValue(true);
});

test('fetchParties returns correct parties with logos', async () => {
  const parties = await fetchParties();

  expect(parties).toMatchObject(mockedInstitutionResources.map(institutionBaseResource2BaseParty));

  parties.forEach((p) =>
    expect(p.urlLogo).toBe(`http://checkout.selfcare/institutions/${p.partyId}/logo.png`)
  );

  expect(dashboardApiGetInstitutionsSpy).toBeCalledTimes(1);
});

describe('fetchPartyDetails and updateBusinessData', () => {
  const expectedPartyId = '5b321318-3df7-48c1-67c8-1111e6707c3d';

  const checkSelectedParty = (party: Party) => {
    expect(party).toMatchObject(institutionResource2Party(mockedInstitutionResources[0]));
    expect(party.urlLogo).toBe(`http://checkout.selfcare/institutions/${expectedPartyId}/logo.png`);
  };

  const checkDashboardInvocation = (expectedCallsNumber: number) => {
    expect(dashboardApiGetInstitutionSpy).toBeCalledTimes(expectedCallsNumber);
    if (expectedCallsNumber > 0) {
      expect(dashboardApiGetInstitutionSpy).toBeCalledWith(expectedPartyId);
    }
  };

  test('fetchPartyDetails without cache calls API', async () => {
    const party = await fetchPartyDetails(expectedPartyId);
    if (party) checkSelectedParty(party);

    checkDashboardInvocation(1);
  });

  test('fetchPartyDetails with cache returns same party', async () => {
    const party = await fetchPartyDetails(expectedPartyId);
    if (party) checkSelectedParty(party);

    checkDashboardInvocation(1);

    const party2 = await fetchPartyDetails(expectedPartyId);
    expect(party2).toStrictEqual(party);

    checkDashboardInvocation(2); // You might want to adjust depending on cache logic
  });

  test('updateBusinessData updates email', async () => {
    const institutionId = mockedInstitutionResources.map(institutionResource2Party)[1].partyId;
    const newEmail = 'mockemail@mocktest.com';

    const success = await updateBusinessData(institutionId, newEmail);
    expect(success).toBeTruthy();
    expect(dashboardApiUpdateBusinessDataSpy).toBeCalledTimes(1);
  });

  test('updateBusinessData updates businessName', async () => {
    const institutionId = mockedInstitutionResources.map(institutionResource2Party)[3].partyId;
    const newEmail = 'mockemail@mocktest.com';

    const success = await updateBusinessData(institutionId, newEmail);
    expect(success).toBeTruthy();
    expect(dashboardApiUpdateBusinessDataSpy).toBeCalledTimes(1);
  });
});
