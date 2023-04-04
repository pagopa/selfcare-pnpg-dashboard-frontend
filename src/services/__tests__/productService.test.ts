import { mockedProductResources } from '../../api/__mocks__/DashboardPnpgApiClient';
import { fetchProducts, fetchProductRoles } from '../productService';
import { mockedPartyProducts } from '../__mocks__/productService';

jest.mock('../productService');

beforeEach(() => {
  jest.spyOn(require('../productService'), 'fetchProducts');
  jest.spyOn(require('../productService'), 'fetchProductRoles');
});

test('Test fetchProducts', async () => {
  const products = await fetchProducts('5b321318-3df7-48c1-67c8-1111e6707c3d');

  expect(products).toMatchObject(mockedProductResources[0]);

  expect(fetchProducts).toBeCalledTimes(1);
});

test('Test fetchProductRoles', async () => {
  const productRoles = await fetchProductRoles(mockedPartyProducts[0]);

  expect(productRoles).toStrictEqual([
    {
      productId: mockedPartyProducts[0].id,
      partyRole: 'MANAGER',
      selcRole: 'ADMIN',
      multiroleAllowed: false,
      productRole: 'referente-legale',
      title: 'Referente Legale',
      description: 'Descrizione referente-legale',
    },
    {
      productId: mockedPartyProducts[0].id,
      partyRole: 'DELEGATE',
      selcRole: 'ADMIN',
      multiroleAllowed: false,
      productRole: 'referente-amministrativo',
      title: 'Amministratore',
      description: 'Descrizione referente-amministrativo',
    },
    {
      productId: mockedPartyProducts[0].id,
      partyRole: 'OPERATOR',
      selcRole: 'LIMITED',
      multiroleAllowed: false,
      productRole: 'Amministratore',
      title: 'Amministratore',
      description: 'Ha tutti i permessi e gestisce gli utenti',
    },
    {
      productId: mockedPartyProducts[0].id,
      partyRole: 'OPERATOR',
      selcRole: 'LIMITED',
      multiroleAllowed: false,
      productRole: 'Gestore Notifiche',
      title: 'Gestore Notifiche',
      description: "Gestisce l’integrazione tecnologica e/o l'operatività dei servizi",
    },
  ]);

  expect(fetchProductRoles).toBeCalledWith(mockedPartyProducts[0]);
});
