import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../redux/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import PartySelectionContainer from '../PartySelectionContainer';
import { partiesActions } from '../../../redux/slices/partiesSlice';
import { mockedInstitutionResources } from '../../../api/__mocks__/DashboardApi';
import { BaseParty, Party } from '../../../model/Party';
import './../../../locale';
import { ProductOnBoardingStatusEnum } from '../../../api/generated/b4f-dashboard-pnpg/OnboardedProductResource';
import {
  InstitutionResource
} from '../../../api/generated/b4f-dashboard-pnpg/InstitutionResource';
import { mockedBaseInstitutions } from '../../../services/__mocks__/partyService';

const mockedParty: Array<BaseParty> = [
  {
    partyId: '5b321318-3df7-48c1-67c8-1111e6707c3d',
    externalId: '01113570210',
    description: 'mockedBusiness1',
    status: 'ACTIVE',
    userRole: 'ADMIN',
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
      store.dispatch(partiesActions.setPartiesList(mockedBaseInstitutions));
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

  await waitFor(() =>
    screen.getByText('Per leggere le notifiche devi prima registrare la tua impresa', {
      exact: false,
    })
  );
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
  await renderComponent('one');

  await waitFor(() => screen.getByText('Seleziona la tua impresa'));

  const signInButton = screen.getByText('Accedi');
  expect(signInButton).toBeEnabled();

  fireEvent.click(signInButton);
});
