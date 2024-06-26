import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { createStore } from '../redux/store';
import { verifyMockExecution as verifyLoginMockExecution } from '../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import { verifyMockExecution as verifyPartiesMockExecution } from '../decorators/__mocks__/withParties';
import { verifyMockExecution as verifySelectedPartyMockExecution } from '../decorators/__mocks__/withSelectedParty';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { mockedBaseInstitutions } from '../services/__mocks__/partyService';
import { ThemeProvider } from '@mui/material';
import { theme } from '@pagopa/mui-italia';

jest.mock('@pagopa/selfcare-common-frontend/lib/decorators/withLogin');
jest.mock('../decorators/withParties');
jest.mock('../decorators/withSelectedParty');

const renderApp = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  render(
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ThemeProvider>
  );
  return { store, history };
};

test('Test rendering', () => {
  const { store } = renderApp();
  verifyLoginMockExecution(store.getState());
  verifyPartiesMockExecution(store.getState());
});

test('Test rendering dashboard parties loaded', () => {
  const history = createMemoryHistory();
  history.push('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d');

  const { store } = renderApp(undefined, history);

  verifyLoginMockExecution(store.getState());
  expect(store.getState().parties.list).toBe(mockedBaseInstitutions);
});

test('Test routing ', async () => {
  const { history, store } = renderApp();
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard'));

  history.push('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d');
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d')
  );

  verifySelectedPartyMockExecution(store.getState());
});
