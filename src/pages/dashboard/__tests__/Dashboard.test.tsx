import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { verifyMockExecution as verifySelectedPartyMockExecution } from '../../../decorators/__mocks__/withSelectedParty';
import { createStore } from '../../../redux/store';
import Dashboard from '../Dashboard';

vi.mock('../../../decorators/withSelectedParty');

const renderDashboard = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ?? createStore();
  const history = injectedHistory ?? createMemoryHistory();
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
  const history = createMemoryHistory();

  history.push('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d');
  expect(history.location.pathname).toBe('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d');

  history.push('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/users');
  expect(history.location.pathname).toBe('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/users');

  history.push('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/groups');
  expect(history.location.pathname).toBe('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/groups');
});
