import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../redux/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import NoParty from '../NoParty';

jest.mock('../../../decorators/withSelectedParty');

const renderComponent = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  render(
    <Router history={history}>
      <Provider store={store}>
        <NoParty />
      </Provider>
    </Router>
  );
  return { store, history };
};

test('Test rendering NoParty component', () => {
  renderComponent();
});
