import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { PartyPnpg } from '../../../model/PartyPnpg';
import PartyAccountItemSelection from '../PartyAccountItemSelection';
import PartySelectionSearch from '../PartySelectionSearch';
import './../../../locale';

let selectedParty: PartyPnpg | null = null;

const parties: Array<PartyPnpg> = [
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness1',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    digitalAddress: '',
    fiscalCode: '01113570210',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness2',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    digitalAddress: '',
    fiscalCode: '03343570210',
    category: '',
    externalId: '03343570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness3',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b971318-3df7-11c1-67c8-1111e6707c3d',
    digitalAddress: '',
    fiscalCode: '05923570210',
    category: '',
    externalId: '05923570210',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
  {
    userRole: 'ADMIN',
    description: 'mockedBusiness4',
    urlLogo: 'image',
    status: 'ACTIVE',
    partyId: '5b971318-3df7-11c1-67c8-1111e6707dgt',
    digitalAddress: '',
    fiscalCode: '05923570510',
    category: '',
    externalId: '05923570510',
    originId: 'originId1',
    origin: 'IPA',
    institutionType: 'Azienda privata',
  },
];

beforeEach(() => (selectedParty = null));

test('Test rendering', () => {
  render(
    <PartySelectionSearch
      parties={parties}
      onPartySelectionChange={(p) => (selectedParty = p)}
      selectedParty={selectedParty}
    />
  );
  const input = document.getElementById('search');

  expect(input?.tagName).toBe('INPUT');

  parties
    .map((x) => x.description)
    .forEach((element) => {
      screen.getByText(element);
    });

  if (parties.length > 3) {
    expect(input?.tagName).toBe('INPUT');
  } else {
    expect(input?.tagName).not.toBe('INPUT');
  }
});

test('Test filter', () => {
  render(
    <PartySelectionSearch
      parties={parties}
      onPartySelectionChange={(p) => (selectedParty = p)}
      selectedParty={selectedParty}
    />
  );
  const input = document.getElementById('search');

  if (input) {
    fireEvent.change(input, { target: { value: 'mockedBusiness3 mockedBusiness3' } });
    expect(input?.getAttribute('value')).toBe('mockedBusiness3 mockedBusiness3');
  }

  parties
    .map((x) => x.description)
    .forEach((element) => {
      const party = screen.queryByText(element);

      if (element.indexOf('mockedBusiness1 mockedBusiness1') > -1) {
        expect(party).not.toBeNull();
      } else {
        expect(party).toBeNull();
      }
    });
  if (input) {
    fireEvent.change(input, { target: { value: null } });
    expect(input.getAttribute('value')).toBe('');
  }

  parties
    .map((x) => x.description)
    .forEach((element) => {
      screen.getByText(element);
    });
});

test('Test selection when there are < 3 parties', async () => {
  const partiesLessThen3 = parties.slice();
  partiesLessThen3.shift();
  render(
    <PartySelectionSearch
      parties={partiesLessThen3}
      onPartySelectionChange={(p) => (selectedParty = p)}
      selectedParty={selectedParty}
    />
  );

  expect(selectedParty).toBe(null);

  const buttonParty = screen.getByRole('button', { name: 'mockedBusiness3 mockedBusiness3' });

  fireEvent.click(buttonParty);

  const selectedLessThen3 = document.getElementById('selectedLessThen3');
  if (selectedLessThen3) getByText(selectedLessThen3, 'mockedBusiness3 mockedBusiness3');
});

test('Test selection when there are > 3 parties', async () => {
  render(
    <PartySelectionSearch
      parties={parties}
      onPartySelectionChange={(p) => (selectedParty = p)}
      selectedParty={selectedParty}
    />
  );
  expect(selectedParty).toBe(null);

  const buttonParty = screen.getByRole('button', { name: 'mockedBusiness4 mockedBusiness4' });

  fireEvent.click(buttonParty);

  const selectedMoreThen3 = document.getElementsByClassName('selectedMoreThen3')[0];
  if (selectedMoreThen3) getByText(selectedMoreThen3, 'mockedBusiness1');
});

test('Select a party, then clear the selection', async () => {
  render(<PartyAccountItemSelection selectedParty={selectedParty} clearField={() => 'clear'} />);

  const clearSelection = screen.getByTestId('ClearOutlinedIcon');
  fireEvent.click(clearSelection);

  expect(selectedParty).toBe(null);
});
