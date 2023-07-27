export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Log-in-Seite weitergeleitet ...',
    },
  },
  unmanageableBusiness: 'Die ausgewählte Firma ist nicht verwaltbar',
  businessSelection: {
    title: 'Wähle deine Firma',
    subTitle:
      'Wenn du Bescheide mehrerer Firmen liest, kann die Auswahl nach der Anmeldung geändert werden.',
    onboardAnotherBusiness:
      'Bist du ein gesetzlicher Vertreter? <1>Neues Unternehmen registrieren</1>',
    search: 'Unternehmen suchen',
    signIn: 'Zugriff',
    noBusinessFound: {
      title: 'Das Unternehmen ist noch nicht <1/>registriert ',
      description: 'Die Registrierung kann nur durch einen gesetzlichen <1/>Vertreter erfolgen.',
      registerBusiness: 'Unternehmen registrieren',
    },
  },
  productsList: {
    yourBusiness: 'Deine Firma',
    digitalNotifications: 'Digitale Bescheide',
  },
  overview: {
    title: 'Übersicht',
    subTitle: 'Zeigt die Zusammenfassung der Daten und Bescheide von {{ businessName }} an.',
    sideMenu: {
      institutionManagement: {
        title: 'Verwaltung der Körperschaft',
        overview: {
          title: 'Übersicht',
        },
        referents: {
          title: 'Benutzer',
        },
        groups: {
          title: 'Gruppen',
        },
      },
    },
    notificationAreaProduct: {
      title: 'Digitale Bescheide',
      card: {
        title: 'Zu den Bescheiden',
      },
    },
    businessLogo: {
      upload: 'Firmenlogo hochladen',
      modify: 'Firmenlogo ändern',
      uploadError: {
        title: 'Laden fehlgeschlagen',
        description:
          'Das Hochladen des Logos ist fehlgeschlagen. Überprüfen, ob das Format und die Größe korrekt sind, und erneut hochladen',
      },
      modifyError: {
        title: 'Laden fehlgeschlagen',
        description: 'Es ist leider ein Fehler aufgetreten. Bitte versuche es später noch einmal',
      },
      size: 'Maximale Größe 300 x <1/> 300px - .png-Format',
      info: 'Füge nur das Logo deiner Firma ein. <1/> Du trägst die Verantwortung für das Einfügen von Bildern, die nicht aufgeführt sind. ',
    },
    partyDetail: {
      businessName: 'Firmenname',
      fiscalCode: 'Steuernummer',
      mailAddress: 'Institutionelle E-Mail',
      editBusinessName: 'Bearbeiten',
      editBusinessNameModal: {
        title: 'Firmennamen ändern',
        subTitle: 'Wenn der Firmenname nicht korrekt ist, bitte hier ändern.',
        textFieldLabel: 'Firmenname',
        invalidBusinessName: 'Firmenbezeichnung eingeben',
        notEqualBusinessName: 'Eine andere Firmenbezeichnung eingeben',
        disclaimer:
          'Du trägst die Verantwortung für die Eingabe von Daten, die nicht aufgeführt sind.',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        success: {
          description: 'Firmenname erfolgreich geändert',
        },
        error: {
          description: 'Beim Eingeben ist ein Fehler aufgetreten. Erneut versuchen.',
        },
      },
      editBusinessEmail: 'Bearbeiten',
      editBusinessEmailModal: {
        title: 'Institutionelle E-Mail-Adresse ändern',
        subTitle: 'Wenn die E-Mail-Adresse nicht korrekt ist, bitte hier ändern.',
        textFieldLabel: 'Institutionelle E-Mail',
        invalidEmail: 'Die eingegebene E-Mail-Adresse ist falsch',
        notEqualBusinessEmail: 'Eine andere institutionelle E-Mail-Adresse eingeben',
        disclaimer:
          'Du trägst die Verantwortung für die Eingabe von Daten, die nicht aufgeführt sind.',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        success: {
          description: 'Institutionelle E-Mail erfolgreich geändert',
        },
        error: {
          description: 'Beim Eingeben ist ein Fehler aufgetreten. Erneut versuchen.',
        },
      },
    },
  },
};
