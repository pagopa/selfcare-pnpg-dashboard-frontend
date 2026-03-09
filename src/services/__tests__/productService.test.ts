import { mockedProductResources } from '../../api/__mocks__/DashboardApi';
import { fetchProducts, fetchProductRoles } from '../productService';
import { productResource2Product } from '../../model/Product';
import { mockedPartyProducts } from '../__mocks__/productService';
import { DashboardApi } from '../../api/DashboardApi';

vi.mock('../../api/DashboardApi');

beforeEach(() => {
  vi.spyOn(DashboardApi, 'getProducts');
  vi.spyOn(DashboardApi, 'getProductRoles');
});

test('Test fetchProducts', async () => {
  const products = await fetchProducts();

  expect(products).toMatchObject(mockedProductResources.map(productResource2Product));

  expect(DashboardApi.getProducts).toBeCalledTimes(1);
});

test('Test fetchProductRoles', async () => {
  const productRoles = await fetchProductRoles(mockedPartyProducts[0]);

  expect(productRoles).toStrictEqual([
    {
      productId: mockedPartyProducts[0].id,
      partyRole: 'SUB_DELEGATE',
      selcRole: 'ADMIN',
      multiroleAllowed: false,
      phasesAdditionAllowed: undefined,
      productRole: 'pg-admin',
      title: 'Amministratore',
      description: 'Stipula il contratto e identifica gli amministratori',
    },
    {
      productId: mockedPartyProducts[0].id,
      partyRole: 'OPERATOR',
      selcRole: 'LIMITED',
      multiroleAllowed: false,
      phasesAdditionAllowed: undefined,
      productRole: 'pg-operator',
      title: 'Tecnico',
      description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
    },
  ]);

  expect(DashboardApi.getProductRoles).toBeCalledWith(mockedPartyProducts[0].id);
});
