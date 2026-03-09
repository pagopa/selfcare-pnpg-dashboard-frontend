import { DashboardApi } from '../../api/DashboardApi';

vi.mock('../../api/DashboardApi');

// Spy — let TS infer the type
let retrieveProductBackofficeSpy = vi.spyOn(DashboardApi, 'retrieveProductBackoffice');

beforeEach(() => {
  retrieveProductBackofficeSpy.mockClear();
  retrieveProductBackofficeSpy.mockResolvedValue('https://hostname/path?id=DUMMYTOKEN');
});

test('Test retrieveTokenExchange', async () => {
  const url = await DashboardApi.retrieveProductBackoffice('product1', 'institution1');

  expect(url).toBe('https://hostname/path?id=DUMMYTOKEN');
  expect(retrieveProductBackofficeSpy).toBeCalledTimes(1);
});
