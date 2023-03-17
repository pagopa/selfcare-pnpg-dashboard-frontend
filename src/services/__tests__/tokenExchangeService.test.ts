import { mockedPnpgParties } from '../__mocks__/partyService';
import { retrieveBackOfficeUrl } from '../tokenExchangeService';
import { mockedPartyProduct } from '../__mocks__/productService';

jest.mock('../tokenExchangeService');

beforeEach(() => {
  jest.spyOn(require('../tokenExchangeService'), 'retrieveBackOfficeUrl');
});

test('Test retrieveTokenExchange', async () => {
  const url = await retrieveBackOfficeUrl(mockedPnpgParties[0], mockedPartyProduct);

  expect(url).toBe('https://hostname/path?id=DUMMYTOKEN');

  expect(retrieveBackOfficeUrl).toBeCalledTimes(1);
});
