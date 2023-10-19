export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Login-Seite weitergeleitet...',
    },
  },
  unmanageableBusiness: 'Das ausgewählte Unternehmen ist nicht verwaltbar',
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
    subTitle: 'Anzeige der zusammengefassten Daten und Aufruf der Bescheide von{{ businessName }}.',
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
      modify: 'Bearbeiten',
      uploadError: {
        title: 'Laden fehlgeschlagen',
        description:
          'Das Laden des Logos ist fehlgeschlagen. Überprüfe, ob das Format und die Größe korrekt sind und lade es erneut hoch.',
      },
      modifyError: {
        title: 'Laden fehlgeschlagen',
        description: 'Es ist leider ein Fehler aufgetreten. Bitte versuche es später noch einmal',
      },
      size: 'Genaue Größe 300 x <1/> 300px - .png-Format',
      info: 'Gib nur das Logo deines Unternehmens ein. <1/> Du trägst die Verantwortung für das Einfügen von Bildern, die nicht aufgeführt sind. ',
    },
    partyDetail: {
      businessName: 'Firmenname',
      fiscalCode: 'Steuernummer',
      mailAddress: 'Primäre PEC-Adresse',
      editBusinessName: 'Bearbeiten',
      editBusinessNameModal: {
        title: 'Änderung des Firmennamens',
        subTitle: 'Wenn der Firmenname nicht korrekt ist, ändere ihn hier.',
        textFieldLabel: 'Firmenname',
        invalidBusinessName: 'Bitte gib einen Firmennamen ein',
        notEqualBusinessName: 'Bitte gib einen anderen Firmennamen ein',
        disclaimer:
          'Du trägst die Verantwortung für das Einfügen von Daten, die nicht aufgeführt sind.',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        success: {
          description: 'Firmenname korrekt geändert',
        },
        error: {
          description: 'Bei der Eingabe ist ein Fehler aufgetreten. Nochmals versuchen.',
        },
      },
      editBusinessEmail: 'Bearbeiten',
      editBusinessEmailModal: {
        title: 'Primäre PEC-Adresse ändern',
        subTitle: 'Wenn die PEC-Adresse nicht korrekt ist, ändere sie hier.',
        textFieldLabel: 'PEC-Adresse',
        invalidEmail: 'Die eingegebene PEC-Adresse ist falsch',
        notEqualBusinessEmail: 'Bitte gib eine andere PEC-Adresse ein',
        disclaimer:
          'Du trägst die Verantwortung für das Einfügen von Daten, die nicht aufgeführt sind.',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        success: {
          description: 'PEC-Adresse geändert',
        },
        error: {
          description: 'Bei der Eingabe ist ein Fehler aufgetreten. Nochmals versuchen.',
        },
      },
    },
  },
};
