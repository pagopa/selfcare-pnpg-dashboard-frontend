import { mockedProductResources } from '../../api/__mocks__/DashboardPnpgApiClient';
import { fetchProducts, fetchProductRoles } from '../productService';
import { productResource2Product } from '../../model/Product';
import {
  mockedMappedProductRoles,
  mockedPartyProducts,
  mockedProductRoles,
} from '../__mocks__/productService';
import { DashboardPnpgApi } from '../../api/DashboardPnpgApiClient';

jest.mock('../../api/DashboardPnpgApiClient', () => ({
  DashboardPnpgApi: {
    getProducts: jest.fn(),
    getProductRoles: jest.fn(),
  },
}));

test('Test fetchProducts', async () => {
  DashboardPnpgApi.getProducts.mockResolvedValue(mockedProductResources);

  const products = await fetchProducts('5b321318-3df7-48c1-67c8-1111e6707c3d');

  expect(products).toMatchObject(mockedProductResources.map(productResource2Product));

  expect(DashboardPnpgApi.getProducts).toBeCalledTimes(1);
});

test('Test fetchProductRoles', async () => {
  DashboardPnpgApi.getProductRoles.mockResolvedValue(mockedMappedProductRoles);

  const productRoles = await await fetchProductRoles(mockedPartyProducts[0]);

  expect(productRoles).toMatchObject(mockedProductRoles);

  expect(DashboardPnpgApi.getProductRoles).toBeCalledWith(mockedPartyProducts[0].id);
});
