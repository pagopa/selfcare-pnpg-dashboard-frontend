import { mockedProductRoles } from '../../services/__mocks__/productService';
import { ProductRole, productRoles2ProductRolesList } from '../ProductRole';

test('Test productRoles2ProductRolesList', () => {
  const rolesList = productRoles2ProductRolesList(mockedProductRoles);
  expect(rolesList).toStrictEqual({
    list: mockedProductRoles,
    groupBySelcRole: {
      ADMIN: [
        {
          productId: 'PRODID',
          partyRole: 'MANAGER',
          selcRole: 'ADMIN',
          multiroleAllowed: false,
          productRole: 'referente-legale',
          title: 'Referente Legale',
          description: 'Descrizione referente-legale',
        },
        {
          productId: 'PRODID',
          partyRole: 'DELEGATE',
          selcRole: 'ADMIN',
          multiroleAllowed: false,
          productRole: 'referente-amministrativo',
          title: 'Amministratore',
          description: 'Descrizione referente-amministrativo',
        },
      ],
      LIMITED: [
        {
          productId: 'PRODID',
          partyRole: 'OPERATOR',
          selcRole: 'LIMITED',
          multiroleAllowed: true,
          productRole: 'Amministratore',
          title: 'Amministratore',
          description: 'Ha tutti i permessi e gestisce gli utenti',
        },
        {
          productId: 'PRODID',
          partyRole: 'OPERATOR',
          selcRole: 'LIMITED',
          multiroleAllowed: true,
          productRole: 'Gestore Notifiche',
          title: 'Gestore Notifiche',
          description: "Gestisce l’integrazione tecnologica e/o l'operatività dei servizi",
        },
      ],
    },
    groupByPartyRole: {
      DELEGATE: [
        {
          productId: 'PRODID',
          partyRole: 'DELEGATE',
          selcRole: 'ADMIN',
          multiroleAllowed: false,
          productRole: 'referente-amministrativo',
          title: 'Amministratore',
          description: 'Descrizione referente-amministrativo',
        },
      ],
      MANAGER: [
        {
          productId: 'PRODID',
          partyRole: 'MANAGER',
          selcRole: 'ADMIN',
          multiroleAllowed: false,
          productRole: 'referente-legale',
          title: 'Referente Legale',
          description: 'Descrizione referente-legale',
        },
      ],
      OPERATOR: [
        {
          productId: 'PRODID',
          partyRole: 'OPERATOR',
          selcRole: 'LIMITED',
          multiroleAllowed: true,
          productRole: 'Amministratore',
          title: 'Amministratore',
          description: 'Ha tutti i permessi e gestisce gli utenti',
        },
        {
          productId: 'PRODID',
          partyRole: 'OPERATOR',
          selcRole: 'LIMITED',
          multiroleAllowed: true,
          productRole: 'Gestore Notifiche',
          title: 'Gestore Notifiche',
          description: "Gestisce l’integrazione tecnologica e/o l'operatività dei servizi",
        },
      ],
      SUB_DELEGATE: [],
    },
    groupByProductRole: {
      'referente-legale': {
        productId: 'PRODID',
        partyRole: 'MANAGER',
        selcRole: 'ADMIN',
        multiroleAllowed: false,
        productRole: 'referente-legale',
        title: 'Referente Legale',
        description: 'Descrizione referente-legale',
      },
      'referente-amministrativo': {
        productId: 'PRODID',
        partyRole: 'DELEGATE',
        selcRole: 'ADMIN',
        multiroleAllowed: false,
        productRole: 'referente-amministrativo',
        title: 'Amministratore',
        description: 'Descrizione referente-amministrativo',
      },
      'Gestore Notifiche': {
        productId: 'PRODID',
        partyRole: 'OPERATOR',
        selcRole: 'LIMITED',
        multiroleAllowed: true,
        productRole: 'Gestore Notifiche',
        title: 'Gestore Notifiche',
        description: "Gestisce l’integrazione tecnologica e/o l'operatività dei servizi",
      },
      Amministratore: {
        productId: 'PRODID',
        partyRole: 'OPERATOR',
        selcRole: 'LIMITED',
        multiroleAllowed: true,
        productRole: 'Amministratore',
        title: 'Amministratore',
        description: 'Ha tutti i permessi e gestisce gli utenti',
      },
    },
  });
});
