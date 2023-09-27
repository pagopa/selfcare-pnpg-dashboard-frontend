import {
  ProductsResource,
  StatusEnum,
} from '../../api/generated/b4f-dashboard-pnpg/ProductsResource';
import { productResource2Product } from '../Product';

test('Test institutionInfo2Party', () => {
  const date = new Date();

  const productResource: ProductsResource = {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    id: 'prod-pn-pg',
    title: 'SEND',
    description: 'Descrizione SEND',
    status: StatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    logoBgColor: 'pagoPA.main',
    delegable: false,
  };

  const product = productResource2Product(productResource);
  expect(product).toStrictEqual({
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    id: 'prod-pn-pg',
    title: 'SEND',
    description: 'Descrizione SEND',
    status: StatusEnum.ACTIVE,
    activationDateTime: undefined,
    backOfficeEnvironmentConfigurations: undefined,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    logoBgColor: 'pagoPA.main',
    delegable: false,
    subProducts: undefined,
    tag: undefined,
  });
});
