import { fireEvent, render, screen } from '@testing-library/react';
import '../../../../../../locale';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../redux/store';
import { institutionPnPGResource2PartyPnpg, PartyPnpg } from '../../../../../../model/PartyPnpg';
import { mockedPnPGInstitutionsResource } from '../../../../../../api/__mocks__/DashboardPnpgApiClient';
import PartyDetail from '../PartyDetail';

const mockedBusinesses = mockedPnPGInstitutionsResource.map(institutionPnPGResource2PartyPnpg);

const renderPartyDetail = (party: PartyPnpg) => {
  render(
    <Provider store={createStore()}>
      <PartyDetail party={party} />
    </Provider>
  );
};

test('test render component', () => {
  renderPartyDetail(mockedBusinesses[0]);
  expect(document.getElementById('partyCard'));
  screen.getByText('Ragione sociale');
});

test('Test: Edit businessEmail', async () => {
  renderPartyDetail(mockedBusinesses[0]);
  screen.getByText('E-mail istituzionale');
  const editButton = screen.getByText('Modifica');
  fireEvent.click(editButton);

  await screen.getByText('Modifica l’indirizzo e-mail istituzionale');
  const confirmButton = screen.getByText('Conferma');
  expect(confirmButton).toBeDisabled();

  const closeButton = screen.getByText('Annulla');
  fireEvent.click(closeButton);

  fireEvent.click(editButton);
  await screen.getByText('Modifica l’indirizzo e-mail istituzionale');
  expect(confirmButton).toBeDisabled();

  const businessEmailTextfield = document.getElementById('email-textfield');

  fireEvent.change(businessEmailTextfield, { target: { value: 'email' } });
  screen.getByText("L'indirizzo e-mail inserito non è corretto");

  fireEvent.change(businessEmailTextfield, { target: { value: 'email@emailtest.com' } });

  expect(confirmButton).toBeEnabled();

  fireEvent.click(confirmButton);
});

test('Test: change the businessName of a non "certified" company', async () => {
  renderPartyDetail(mockedBusinesses[2]);
  screen.getByText('Ragione sociale');
  const editButton = screen.getAllByText('Modifica')[0];
  fireEvent.click(editButton);

  await screen.getByText('Modifica la ragione sociale');
  const confirmButton = screen.getByText('Conferma');
  expect(confirmButton).toBeDisabled();

  const closeButton = screen.getByText('Annulla');
  fireEvent.click(closeButton);

  fireEvent.click(editButton);
  await screen.getByText('Modifica la ragione sociale');
  expect(confirmButton).toBeDisabled();

  const businessEmailTextfield = document.getElementById('businessname-textfield');

  fireEvent.change(businessEmailTextfield, { target: { value: '  ' } });
  screen.getByText('Inserisci una ragione sociale');

  fireEvent.change(businessEmailTextfield, { target: { value: 'editedBusinessName' } });

  expect(confirmButton).toBeEnabled();

  fireEvent.click(confirmButton);
});
