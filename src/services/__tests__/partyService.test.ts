import { fetchParties, fetchPartyDetails } from '../partyService';
import { fetchParties, fetchPartyDetails } from '../partyService';
import { institutionPnPGResource2PartyPnpg, PartyPnpg } from '../../model/PartyPnpg';
import { DashboardPnpgApi } from '../../api/DashboardPnpgApiClient';
import { DashboardPnpgApi } from '../../api/DashboardPnpgApiClient';
import { mockedPnPGInstitutionsResource } from '../../api/__mocks__/DashboardPnpgApiClient';

jest.mock('../../api/DashboardPnpgApiClient', () => ({
  DashboardPnpgApi: {
    fetchParties: jest.fn(),
    fetchPartyDetails: jest.fn(),
  },
}));

test('Test fetchParties', async () => {
  DashboardPnpgApi.fetchParties.mockResolvedValue(mockedPnPGInstitutionsResource);

  const parties = await fetchParties();

  expect(parties).toMatchObject(
    mockedPnPGInstitutionsResource.map(institutionPnPGResource2PartyPnpg)
  );

  parties.forEach((p) =>
    expect(p.urlLogo).toBe(`http://checkout.selfcare/institutions/${p.partyId}/logo.png`)
  );

  expect(DashboardPnpgApi.DashboardPnpgApi.fetchParties).toBeCalledTimes(1);
});

describe('Test fetchPartyDetails', () => {
  const expectedPartyId: string = '5b321318-3df7-48c1-67c8-1111e6707c3d';

  const checkSelectedParty = (party: PartyPnpg) => {
    expect(party).toMatchObject(
      institutionPnPGResource2PartyPnpg(mockedPnPGInstitutionsResource[0])
    );

    expect(party.urlLogo).toBe(`http://checkout.selfcare/institutions/${expectedPartyId}/logo.png`);

    expect(party.urlLogo).toBe(`http://checkout.selfcare/institutions/${expectedPartyId}/logo.png`);
  };

  test('Test no parties as cache', async () => {
    DashboardPnpgApi.fetchParties.mockResolvedValue(mockedPnPGInstitutionsResource[0]);

    const party = await fetchPartyDetails(expectedPartyId);
    if (party) {
      checkSelectedParty(party);
    }
  });
});
