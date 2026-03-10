import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { createStore } from '../../redux/store';
import withSelectedParty from '../withSelectedParty';

vi.mock('../../services/partyService');
vi.mock('../../services/productService');

const expectedPartyId: string = '5b321318-3df7-48c1-67c8-1111e6707c3d';

const spyOnPartyService = await import('../../services/partyService');
const spyOnProductService = await import('../../services/productService')

beforeEach(() => {
  vi.spyOn(spyOnPartyService, 'fetchPartyDetails');
 vi.spyOn(spyOnProductService, 'fetchProducts');
});

const renderApp = async (
  waitSelectedParty: boolean,
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ?? createStore();
  const history = injectedHistory ?? createMemoryHistory();

  if (!injectedHistory) {
    history.push(`/${expectedPartyId}`);
  }

  const Component = () => <></>;
  const DecoratedComponent = withSelectedParty(Component);

  render(
    <Router history={history}>
      <Provider store={store}>
        <Switch>
          <Route path="/:partyId">
            <DecoratedComponent />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );

  if (waitSelectedParty) {
    await waitFor(() => expect(store.getState().parties.selected).not.toBeUndefined());
  }

  return { store, history };
};

test('Test party not active', async () => {
  const store = createStore();
  const history = createMemoryHistory();
  history.push(`/2`);
  await renderApp(false, store, history);

  await waitFor(() => expect(store.getState().appState.errors.length).toBe(0));
  expect(store.getState().parties.selected).toBeUndefined();
});
