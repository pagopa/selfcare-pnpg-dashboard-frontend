import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../redux/store';
import { retrieveBackOfficeUrl } from '../../../../../../services/tokenExchangeService';
import { mockedPnpgParties } from '../../../../../../services/__mocks__/partyService';
import { mockedPartyProducts } from '../../../../../../services/__mocks__/productService';
import '../../../../../../locale';
import DigitalNotificationCardContainer from './../DigitalNotificationCardContainer';

const oldWindowLocation = global.window.location;
const mockedLocation = {
  assign: jest.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
};

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

jest.mock('../../../../../../services/tokenExchangeService');

beforeEach(() => {
  jest.spyOn(require('../../../../../../services/tokenExchangeService'), 'retrieveBackOfficeUrl');
});

const mockedProduct = Object.assign({}, mockedPartyProducts[0]);

const renderCard = () => {
  render(
    <Provider store={createStore()}>
      <DigitalNotificationCardContainer party={mockedPnpgParties[0]} product={mockedProduct} />
    </Provider>
  );
};

test('Render test', () => {
  renderCard();
});

test('test render and redirect', async () => {
  renderCard();

  const backOfficeButton = screen.getByRole('button', { name: '' });

  fireEvent.click(backOfficeButton);

  await waitFor(() =>
    expect(retrieveBackOfficeUrl).toBeCalledWith(mockedPnpgParties[0], mockedProduct)
  );

  expect(mockedLocation.assign).toBeCalledWith('https://hostname/path?id=DUMMYTOKEN');
});
