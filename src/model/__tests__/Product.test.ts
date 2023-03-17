import {
  ProductsResource,
  StatusEnum,
} from '../../api/generated/b4f-dashboard-pnpg/ProductsResource';
import { ProductOnBoardingStatusEnum } from '../../api/generated/b4f-dashboard-pnpg/SubProductResource';
import { productResource2Product } from '../Product';

test('Test institutionInfo2Party', () => {
  const date = new Date();

  const productResource: ProductsResource = {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    id: 'prod-pn-pg',
    title: 'Piattaforma Notifiche Persone Giuridiche',
    description: 'Descrizione Piattaforma Notifiche Persone Giuridiche',
    authorized: false,
    productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
    status: StatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    logoBgColor: 'pagoPA.main',
  };

  const product = productResource2Product(productResource);
  expect(product).toStrictEqual({
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    id: 'prod-pn-pg',
    title: 'Piattaforma Notifiche Persone Giuridiche',
    description: 'Descrizione Piattaforma Notifiche Persone Giuridiche',
    authorized: false,
    productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
    status: StatusEnum.ACTIVE,
    activationDateTime: undefined,
    backOfficeEnvironmentConfigurations: undefined,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    logoBgColor: 'pagoPA.main',
    subProducts: [],
    tag: undefined,
    userRole: undefined,
  });
});
