import { institutionPnPGResource2PartyPnpg, PartyPnpg } from '../../model/PartyPnpg';
import { mockedPnPGInstitutionsResource } from '../../api/__mocks__/DashboardPnpgApiClient';
import { fetchParties, fetchPartyDetails } from '../partyService';

jest.mock('../partyService');

beforeEach(() => {
  jest.spyOn(require('../partyService'), 'fetchParties');
});

test('Test fetchParties', async () => {
  await fetchParties();

  const pnpgResourceToPnpgParty = mockedPnPGInstitutionsResource.map(
    institutionPnPGResource2PartyPnpg
  );

  pnpgResourceToPnpgParty.forEach((p) =>
    expect(p.urlLogo).toBe(`http://checkout.selfcare/institutions/${p.partyId}/logo.png`)
  );

  expect(fetchParties).toBeCalledTimes(1);
});

describe('Test fetchPartyDetails', () => {
  const expectedPartyId: string = '5b321318-3df7-48c1-67c8-1111e6707c3d';

  const checkSelectedParty = (party: PartyPnpg) => {
    const pnpgResourceToPnpgParty = mockedPnPGInstitutionsResource.map(
      institutionPnPGResource2PartyPnpg
    )[0];

    expect(pnpgResourceToPnpgParty.partyId).toEqual(party.partyId);

    expect(pnpgResourceToPnpgParty.urlLogo).toBe(
      `http://checkout.selfcare/institutions/${expectedPartyId}/logo.png`
    );
  };

  test('Test no parties as cache', async () => {
    const party = await fetchPartyDetails(expectedPartyId);

    if (party) {
      checkSelectedParty(party);
    }
  });

  test('Test parties as cache', async () => {
    const parties = mockedPnPGInstitutionsResource.map(institutionPnPGResource2PartyPnpg);
    const party = await fetchPartyDetails(expectedPartyId, parties);

    if (party) {
      checkSelectedParty(party);
    }

    const partialParties = parties.filter((p) => p.partyId !== expectedPartyId);
    const party2 = await fetchPartyDetails(expectedPartyId, partialParties);
    expect(party2).toStrictEqual(party);
  });
});
