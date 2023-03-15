import { render, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { Provider } from 'react-redux';
import { createStore } from '../../../redux/store';
import { verifyMockExecution as verifySelectedPartyMockExecution } from '../../../decorators/__mocks__/withSelectedParty';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

jest.mock('../../../decorators/withSelectedParty');

const renderDashboard = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  render(
    <Router history={history}>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </Router>
  );
  return { store, history };
};

test('Test rendering', () => {
  const { store } = renderDashboard();
  verifySelectedPartyMockExecution(store.getState());
});

test('Test routing', async () => {
  const store = createStore();
  const history = createMemoryHistory();

  history.push('/dashboard/00000000000');
  expect(history.location.pathname).toBe('/dashboard/00000000000');

  history.push('/dashboard/00000000000/users');
  expect(history.location.pathname).toBe('/dashboard/00000000000/users');

  history.push('/dashboard/00000000000/groups');
  expect(history.location.pathname).toBe('/dashboard/00000000000/groups');
});
