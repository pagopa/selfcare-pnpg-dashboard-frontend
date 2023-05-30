import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../../redux/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import PartySelection from '../PartySelection';
import { institutionResource2Party, Party } from '../../../../model/Party';
import '../../../../locale/index';
import { mockedInstitutionsResource } from '../../../../api/__mocks__/DashboardApi';

jest.mock('../../../../decorators/withSelectedParty');

const mockedParty: Array<Party> = [
  {
    externalId: 'externalId01',
    partyId: 'partyId01',
    fiscalCode: 'fiscalCode01',
    status: 'ACTIVE',
    description: 'description01',
  },
];

const mockedParties = mockedInstitutionsResource.map(institutionResource2Party);

const renderComponent = (parties: Array<Party>) => {
  const store = createStore();
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Provider store={store}>
        <PartySelection parties={parties} />
      </Provider>
    </Router>
  );
  return { store, history };
};

test('Render test', () => {
  renderComponent(mockedParties);
});

test('Test: PartySelection with only one party: occurrence already selected and access button enabled', async () => {
  renderComponent(mockedParty);
  await waitFor(() => screen.getByText('Seleziona la tua impresa'));

  const signInButton = screen.getByText('Accedi');
  expect(signInButton).toBeEnabled();

  fireEvent.click(signInButton);
});

test('Test: Search a business by writing on the inputfield, remove it and then research, select it and access', async () => {
  renderComponent(mockedParties);
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

test('Test: PartySelection with only one party: occurrence already selected and access button enabled', async () => {
  renderComponent(mockedParties);
  await waitFor(() => screen.getByText('Seleziona la tua impresa'));

  const signInButton = screen.getByText('Accedi');

  expect(signInButton).toBeDisabled();

  const business = screen.getByText('mockedBusiness1');
  fireEvent.click(business);

  expect(signInButton).toBeEnabled();
  fireEvent.click(signInButton);
});
