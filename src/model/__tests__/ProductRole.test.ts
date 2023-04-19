import { mockedProductRoles } from '../../services/__mocks__/productService';
import { ProductRole, productRoles2ProductRolesList } from '../ProductRole';

test('Test productRoles2ProductRolesList', () => {
  const rolesList = productRoles2ProductRolesList(mockedProductRoles);
  expect(rolesList).toStrictEqual({
    list: mockedProductRoles,
    groupBySelcRole: {
      ADMIN: [
        {
          productId: 'prod-pn-pg',
          partyRole: 'MANAGER',
          selcRole: 'ADMIN',
          multiroleAllowed: false,
          productRole: 'pg-admin',
          title: 'Amministratore',
          description: 'Stipula il contratto e identifica gli amministratori',
        },
      ],
      LIMITED: [
        {
          productId: 'prod-pn-pg',
          partyRole: 'OPERATOR',
          selcRole: 'LIMITED',
          multiroleAllowed: false,
          productRole: 'pg-operator',
          title: 'Gestore Notifiche',
          description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
        },
      ],
    },
    groupByPartyRole: {
      DELEGATE: [],
      MANAGER: [
        {
          productId: 'prod-pn-pg',
          partyRole: 'MANAGER',
          selcRole: 'ADMIN',
          multiroleAllowed: false,
          productRole: 'pg-admin',
          title: 'Amministratore',
          description: 'Stipula il contratto e identifica gli amministratori',
        },
      ],
      OPERATOR: [
        {
          productId: 'prod-pn-pg',
          partyRole: 'OPERATOR',
          selcRole: 'LIMITED',
          multiroleAllowed: false,
          productRole: 'pg-operator',
          title: 'Gestore Notifiche',
          description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
        },
      ],
      SUB_DELEGATE: [],
    },
    groupByProductRole: {
      'pg-admin': {
        productId: 'prod-pn-pg',
        partyRole: 'MANAGER',
        selcRole: 'ADMIN',
        multiroleAllowed: false,
        productRole: 'pg-admin',
        title: 'Amministratore',
        description: 'Stipula il contratto e identifica gli amministratori',
      },
      'pg-operator': {
        productId: 'prod-pn-pg',
        partyRole: 'OPERATOR',
        selcRole: 'LIMITED',
        multiroleAllowed: false,
        productRole: 'pg-operator',
        title: 'Gestore Notifiche',
        description: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
      },
    },
  });
});
