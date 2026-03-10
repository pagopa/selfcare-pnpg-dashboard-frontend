import { DashboardApi } from '../../api/DashboardApi';

let retrieveProductBackofficeSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  retrieveProductBackofficeSpy = vi.spyOn(DashboardApi, 'retrieveProductBackoffice');
  retrieveProductBackofficeSpy.mockResolvedValue('https://hostname/path?id=DUMMYTOKEN');
});

afterEach(() => {
  vi.restoreAllMocks();
});


test('Test retrieveTokenExchange', async () => {
  const url = await DashboardApi.retrieveProductBackoffice('product1', 'institution1');

  expect(url).toBe('https://hostname/path?id=DUMMYTOKEN');
  expect(retrieveProductBackofficeSpy).toBeCalledTimes(1);
});
