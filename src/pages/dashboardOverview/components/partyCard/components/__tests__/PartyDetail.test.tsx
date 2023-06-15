import { fireEvent, render, screen } from '@testing-library/react';
import '../../../../../../locale';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../redux/store';
import { institutionResource2Party, Party } from '../../../../../../model/Party';
import { mockedInstitutionsResource } from '../../../../../../api/__mocks__/DashboardApi';
import PartyDetail from '../PartyDetail';

const mockedBusinesses = mockedInstitutionsResource.map(institutionResource2Party);

const renderPartyDetail = (party: Party) => {
  render(
    <Provider store={createStore()}>
      <PartyDetail party={party} />
    </Provider>
  );
};

test('test render component', () => {
  renderPartyDetail(mockedBusinesses[3]);
  expect(document.getElementById('partyCard'));
  screen.getByText('Ragione sociale');
});

test('Test: Edit businessEmail', () => {
  renderPartyDetail(mockedBusinesses[3]);
  screen.getByText('Indirizzo PEC primario');
  const editButton = screen.getAllByText('Modifica')[1];
  fireEvent.click(editButton);

  screen.getByText("Modifica l'indirizzo PEC primario");
  const confirmButton = screen.getByText('Conferma');
  expect(confirmButton).toBeDisabled();

  const closeButton = screen.getByText('Annulla');
  fireEvent.click(closeButton);

  fireEvent.click(editButton);
  screen.getByText("Modifica l'indirizzo PEC primario");
  expect(confirmButton).toBeDisabled();

  const businessEmailTextfield = document.getElementById('email-textfield');

  fireEvent.change(businessEmailTextfield, { target: { value: 'email' } });
  screen.getByText("L'indirizzo PEC inserito non è corretto");

  fireEvent.change(businessEmailTextfield, { target: { value: 'email@emailtest.com' } });

  expect(confirmButton).toBeEnabled();

  fireEvent.click(confirmButton);
});

test('Test: change the businessName of a non "certified" company', () => {
  renderPartyDetail(mockedBusinesses[3]);
  screen.getByText('Ragione sociale');
  const editButton = screen.getAllByText('Modifica')[0];
  fireEvent.click(editButton);

  screen.getByText('Modifica la ragione sociale');
  const confirmButton = screen.getByText('Conferma');
  expect(confirmButton).toBeDisabled();

  const closeButton = screen.getByText('Annulla');
  fireEvent.click(closeButton);

  fireEvent.click(editButton);
  screen.getByText('Modifica la ragione sociale');
  expect(confirmButton).toBeDisabled();

  const businessEmailTextfield = document.getElementById('businessname-textfield');

  fireEvent.change(businessEmailTextfield, { target: { value: '  ' } });
  screen.getByText('Inserisci una ragione sociale');

  fireEvent.change(businessEmailTextfield, { target: { value: 'editedBusinessName' } });

  expect(confirmButton).toBeEnabled();

  fireEvent.click(confirmButton);
});
