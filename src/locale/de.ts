export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Anmeldeseite weitergeleitet...',
    },
  },
  unmanageableBusiness: "Das gewählte Unternehmen kann nicht verwaltet werden",
  businessSelection: {
    title: 'Wähle dein Unternehmen',
    subTitle:
      'Se leggi le notifiche di più imprese, potrai modificare la tua scelta dopo avere effettuato l’accesso.',
    onboardAnotherBusiness: 'Bist du ein Rechtsvertreter? <1>Registriere ein neues Unternehmen</1>',
    search: 'Unternehmen suchen',
    signIn: 'Anmelden',
    noBusinessFound: {
      title: 'Zum Lesen der Zustellungen musst du <1/>zunächst dein Unternehmen registrieren ',
      description: 'Die Registrierung kann nur durch einen <1/>Rechtsvertreter erfolgen.',
      registerBusiness: 'Los',
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
      upload: "Lade das Logo des Unternehmens",
      modify: 'Ändern',
      uploadError: {
        title: 'Laden fehlgeschlagen',
        description:
          'Il caricamento del logo non è andato a buon fine. Verifica che il formato e la dimensione siano corretti e caricalo di nuovo.',
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
        title: "Primäre PEC-Adresse ändern",
        subTitle: 'Ist die PEC-Adresse nicht korrekt, kannst du sie hier ändern.',
        textFieldLabel: 'PEC-Adresse',
        invalidEmail: "Die eingegebene PEC-Adresse ist falsch",
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
