import {
  ProductRoleMappingsResource,
  SelcRoleEnum,
} from '../../api/generated/b4f-dashboard-pnpg/ProductRoleMappingsResource';
import { StatusEnum } from '../../api/generated/b4f-dashboard-pnpg/SubProductResource';
import { Product } from '../../model/Product';
import { ProductRole } from '../../model/ProductRole';

export const mockedPartyProduct: Product = {
  logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
  id: 'prod-pn-pg',
  title: 'SEND',
  description: 'Descrizione SEND',
  status: StatusEnum.ACTIVE,
  urlBO: 'http://notifiche/bo?token=<IdentityToken>',
  activationDateTime: new Date(2021, 1, 2),
  urlPublic: 'http://notifiche/public',
  imageUrl:
    'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
  subProducts: [],
  logoBgColor: 'pagoPA.main',
  delegable: false,
};

export const mockedPartyProducts: Array<Product> = [
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    title: 'SEND',
    description: 'Descrizione SEND',
    id: 'prod-pn-pg',
    status: StatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    subProducts: [],
    logoBgColor: undefined,
    tag: undefined,
    activationDateTime: undefined,
    backOfficeEnvironmentConfigurations: undefined,
    delegable: false,
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    title: 'SEND ambiente sviluppo',
    description: 'SEND ambiente sviluppo',
    id: 'prod-pn-pg-svil',
    status: StatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    subProducts: [],
    logoBgColor: undefined,
    tag: undefined,
    activationDateTime: undefined,
    backOfficeEnvironmentConfigurations: undefined,
    delegable: false,
  },
  {
    logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pn/logo.svg',
    title: 'SEND ambiente collaudo',
    description: 'SEND ambiente collaudo',
    id: 'prod-pn-pg-coll',
    status: StatusEnum.ACTIVE,
    urlBO: 'http://notifiche/bo?token=<IdentityToken>',
    urlPublic: 'http://notifiche/public',
    imageUrl:
      'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
    subProducts: [],
    logoBgColor: undefined,
    tag: undefined,
    activationDateTime: undefined,
    backOfficeEnvironmentConfigurations: undefined,
    delegable: false,
  },
];

export const mockedProductRoles: Array<ProductRole> = [
  {
    productId: 'prod-pn-pg',
    partyRole: 'SUB_DELEGATE',
    selcRole: 'ADMIN',
    multiroleAllowed: false,
    productRole: 'pg-admin',
    title: 'Amministratore',
    description: 'Stipula il contratto e identifica gli amministratori',
    phasesAdditionAllowed: ["dashboard"]
  },
  {
    productId: 'prod-pn-pg',
    partyRole: 'OPERATOR',
    selcRole: 'LIMITED',
    multiroleAllowed: false,
    productRole: 'pg-operator',
    title: 'Tecnico',
    description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
    phasesAdditionAllowed: ["dashboard"]
  },
];

export const mockedMappedProductRoles: Array<ProductRoleMappingsResource> = [
  {
    partyRole: 'MANAGER',
    selcRole: SelcRoleEnum.ADMIN,
    multiroleAllowed: false,
    productRoles: [
      {
        code: 'pg-admin',
        description: 'Stipula il contratto e identifica gli amministratori',
        label: 'Amministratore',
      },
    ],
  },
  {
    partyRole: 'OPERATOR',
    selcRole: SelcRoleEnum.LIMITED,
    multiroleAllowed: false,
    productRoles: [
      {
        code: 'pg-operator',
        description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
        label: 'Tecnico',
      },
    ],
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
