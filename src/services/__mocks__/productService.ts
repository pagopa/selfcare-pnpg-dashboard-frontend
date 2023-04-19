import {
  ProductOnBoardingStatusEnum,
  StatusEnum,
} from '../../api/generated/b4f-dashboard-pnpg/SubProductResource';
import { Product } from '../../model/Product';
import { ProductRole } from '../../model/ProductRole';

export const mockedPartyProduct: Product = {
  logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
  id: 'prod-pn-pg',
  title: 'Piattaforma Notifiche Persone Giuridiche',
  description: 'Piattaforma Notifiche Persone Giuridiche',
  authorized: true,
  productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
  status: StatusEnum.ACTIVE,
  urlBO: 'http://notifiche/bo?token=<IdentityToken>',
  activationDateTime: new Date(2021, 1, 2),
  urlPublic: 'http://notifiche/public',
  imageUrl:
    'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
  subProducts: [],
  logoBgColor: 'pagoPA.main',
  userRole: 'ADMIN',
};

export const mockedPartyProducts: Array<Product> = [
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    id: 'prod-pn-pg',
    title: 'Piattaforma Notifiche Persone Giuridiche',
    description: 'Piattaforma Notifiche Persone Giuridiche',
    authorized: true,
    productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
    status: StatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    activationDateTime: new Date(2021, 1, 2),
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    subProducts: [],
    logoBgColor: 'pagoPA.main',
    userRole: 'ADMIN',
  },
];

export const mockedProductRoles: Array<ProductRole> = [
  {
    productId: 'prod-pn-pg',
    partyRole: 'MANAGER',
    selcRole: 'ADMIN',
    multiroleAllowed: false,
    productRole: 'pg-admin',
    title: 'Amministratore',
    description: 'Stipula il contratto e identifica gli amministratori',
  },
  {
    productId: 'prod-pn-pg',
    partyRole: 'OPERATOR',
    selcRole: 'LIMITED',
    multiroleAllowed: false,
    productRole: 'pg-operator',
    title: 'Gestore Notifiche',
    description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
  },
];

export const verifyFetchPartyProductsMockExecution = (partyProducts: Array<Product>) => {
  expect(partyProducts).toStrictEqual(mockedPartyProduct);
};

export const fetchProducts = () => new Promise((resolve) => resolve(mockedPartyProduct));

export const fetchProductRoles = (product: Product): Promise<Array<ProductRole>> => {
  const out = mockedProductRoles.map((r) =>
    Object.assign(
      {},
      r,
      { productId: product.id },
      { multiroleAllowed: product.id === 'prod-interop' && r.partyRole === 'OPERATOR' }
    )
  );
  return new Promise((resolve) => resolve(out));
};
