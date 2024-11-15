export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Anmeldeseite weitergeleitet...',
    },
  },
  unmanageableBusiness: 'Das gewählte Unternehmen kann nicht verwaltet werden',
  businessSelection: {
    title: 'Wähle dein Unternehmen',
    subTitle:
      'Wenn du die Bescheide mehrerer Unternehmen aufrufst, kannst du deine Auswahl nach der Anmeldung ändern.',
    onboardAnotherBusiness:
      'Bist du ein gesetzlicher Vertreter? <1>Registriere ein neues Unternehmen</1>',
    search: 'Unternehmen suchen',
    signIn: 'Anmelden',
    noBusinessFound: {
      title: 'Um die Bescheide lesen zu können, musst du <1/>zuerst dein Unternehmen registrieren ',
      description:
        'Die Registrierung darf nur von einem gesetzlichen Vertreter <1/> vorgenommen werden.',
      registerBusiness: 'Start',
    },
  },
  productsList: {
    yourBusiness: 'Dein Unternehmen',
  },
  overview: {
    title: 'Übersicht',
    subTitle: 'Zeige die Datenübersicht an und lies die Zustellungen von {{ businessName}}.',
    sideMenu: {
      institutionManagement: {
        title: 'Körperschaftsverwaltung',
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
      title: 'Digitale Zustellungen',
      card: {
        title: 'Zu den Zustellungen',
      },
    },
    businessLogo: {
      upload: 'Lade das Logo des Unternehmens',
      modify: 'Ändern',
      uploadError: {
        title: 'Laden fehlgeschlagen',
        description:
          'Das Laden des Logos ist fehlgeschlagen. Überprüfe, ob das Format und die Größe korrekt sind und lade es erneut hoch.',
      },
      modifyError: {
        title: 'Laden fehlgeschlagen',
        description: 'Leider ist etwas schiefgelaufen. Bitte später erneut versuchen',
      },
      size: 'Genaue Größe 300 x <1/> 300px - Format .png',
      info: 'Füg nur das Logo deines Unternehmens ein. <1/> Du bist für das Einfügen anderer Bilder als der angegebenen verantwortlich. ',
    },
    partyDetail: {
      businessName: 'Firmenbezeichnung',
      fiscalCode: 'Steuernummer',
      mailAddress: 'Primäre PEC-Adresse',
      editBusinessName: 'Ändern',
      editBusinessNameModal: {
        title: 'Firmenbezeichnung ändern',
        subTitle: 'Ist die Firmenbezeichnung nicht korrekt, kannst du sie hier ändern.',
        textFieldLabel: 'Firmenbezeichnung',
        invalidBusinessName: 'Eine Firmenbezeichnung eingeben',
        notEqualBusinessName: 'Eine andere Firmenbezeichnung eingeben',
        disclaimer: 'Du bist für das Einfügen anderer Daten als der angegebenen verantwortlich.',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        success: {
          description: 'Firmenbezeichnung erfolgreich geändert',
        },
        error: {
          description: 'Beim Eingeben ist ein Fehler aufgetreten. Erneut versuchen.',
        },
      },
      editBusinessEmail: 'Ändern',
      editBusinessEmailModal: {
        title: 'Primäre PEC-Adresse ändern',
        subTitle: 'Ist die PEC-Adresse nicht korrekt, kannst du sie hier ändern.',
        textFieldLabel: 'PEC-Adresse',
        invalidEmail: 'Die eingegebene PEC-Adresse ist falsch',
        notEqualBusinessEmail: 'Eine andere PEC-Adresse eingeben',
        disclaimer: 'Du bist für das Einfügen anderer Daten als der angegebenen verantwortlich.',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        success: {
          description: 'PEC-Adresse geändert',
        },
        error: {
          description: 'Beim Eingeben ist ein Fehler aufgetreten. Erneut versuchen.',
        },
      },
    },
  },
};
