import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../redux/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import PartySelectionContainer from '../PartySelectionContainer';
import { partiesActions } from '../../../redux/slices/partiesSlice';
import { mockedInstitutionsResource2Party } from '../../../api/__mocks__/DashboardApi';
import { Party } from '../../../model/Party';
import './../../../locale';

const mockedParty: Array<Party> = [
  {
    userRole: 'LIMITED',
    description: 'mockedBusiness1',
    status: 'ACTIVE',
    partyId: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    fiscalCode: '01113570210',
    mailAddress: 'mockemail1@mocktest.com',
    category: '',
    externalId: '01113570210',
    originId: 'originId1',
    origin: 'INFOCAMERE',
    institutionType: 'Azienda privata',
  },
];

const renderComponent = (
  howManyParties: 'zero' | 'one' | 'moreThanOne',
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();

  switch (howManyParties) {
    case 'moreThanOne':
      store.dispatch(partiesActions.setPartiesList(mockedInstitutionsResource2Party));
      break;
    case 'one':
      store.dispatch(partiesActions.setPartiesList(mockedParty));
      break;
    default:
      store.dispatch(partiesActions.setPartiesList([]));
  }

  render(
    <Router history={history}>
      <Provider store={store}>
        <PartySelectionContainer />
      </Provider>
    </Router>
  );
  return { store, history };
};

test('Test render PartySelection component', () => {
  renderComponent('zero');
});

test('Test with zero party, NoParty component is rendered', async () => {
  renderComponent('zero');

  await waitFor(() => screen.getByText('L’impresa non è ancora registrata'));
});

test('Test with more than a party, PartySelection component is rendered', async () => {
  renderComponent('moreThanOne');

  await waitFor(() => screen.getByText('Seleziona la tua impresa'));
});

test('Test with more than a party, PartySelection component rendered, full search test and button behavior and join with a party', async () => {
  renderComponent('moreThanOne');

  await waitFor(() => screen.getByText('Seleziona la tua impresa'));

  const signInButton = screen.getByText('Accedi');

  expect(signInButton).toBeDisabled();

  const input = document.getElementById('search') as HTMLInputElement;
  const remove = document.getElementById('remove') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '3' } });
  const searchedBusiness = screen.getByText('mockedBusiness3');
  expect(signInButton).toBeDisabled();

  fireEvent.click(remove);
  screen.getByText('mockedBusiness1');

  fireEvent.change(input, { target: { value: '3' } });
  expect(signInButton).toBeDisabled();

  fireEvent.click(searchedBusiness);
  expect(signInButton).toBeEnabled();
  fireEvent.click(signInButton);
});

test('Test with one party, PartySelection component is rendered, the party is auto-selected and join button is enabled', async () => {
  renderComponent('one');

  await waitFor(() => screen.getByText('Seleziona la tua impresa'));

  const signInButton = screen.getByText('Accedi');
  expect(signInButton).toBeEnabled();

  fireEvent.click(signInButton);
});
