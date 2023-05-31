import { mockedInstitutions } from '../__mocks__/partyService';
import { retrieveBackOfficeUrl } from '../tokenExchangeService';
import { mockedPartyProducts } from '../__mocks__/productService';
import { DashboardApi } from '../../api/DashboardApi';

jest.mock('../../api/DashboardApi');

let retrieveProductBackofficeSpy;

beforeEach(() => {
  retrieveProductBackofficeSpy = jest.spyOn(DashboardApi, 'retrieveProductBackoffice');
});

test('Test retrieveTokenExchange', async () => {
  const url = await retrieveBackOfficeUrl(mockedInstitutions[0], mockedPartyProducts[0]);

  expect(url).toBe('https://hostname/path?id=DUMMYTOKEN');

  expect(retrieveProductBackofficeSpy).toBeCalledTimes(1);
});
