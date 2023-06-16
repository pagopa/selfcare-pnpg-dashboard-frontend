export default {
  session: {
    expired: {
      title: 'Sessione scaduta',
      message: 'Stai per essere rediretto alla pagina di login...',
    },
  },
  unmanageableBusiness: "L'impresa selezionata non è gestibile",
  businessSelection: {
    title: 'Seleziona la tua impresa',
    subTitle:
      'Se leggi le notifiche di più imprese, potrai modificare la tua scelta dopo avere effettuato l’accesso.',
    onboardAnotherBusiness: 'Sei un Legale Rappresentante? <1>Registra una nuova impresa</1>',
    search: 'Cerca impresa',
    signIn: 'Accedi',
    noBusinessFound: {
      title: 'Per leggere le notifiche devi <1/>prima registrare la tua impresa ',
      description: 'La registrazione può essere effettuata solo da un Legale <1/>Rappresentante.',
      registerBusiness: 'Inizia',
    },
  },
  productsList: {
    yourBusiness: 'La tua impresa',
    digitalNotifications: 'Notifiche digitali',
  },
  overview: {
    title: 'Panoramica',
    subTitle: 'Visualizza il riepilogo dei dati e leggi le notifiche di {{ businessName }}.',
    sideMenu: {
      institutionManagement: {
        title: 'Gestione Ente',
        overview: {
          title: 'Panoramica',
        },
        referents: {
          title: 'Utenti',
        },
        groups: {
          title: 'Gruppi',
        },
      },
    },
    notificationAreaProduct: {
      title: 'Notifiche digitali',
      card: {
        title: 'Vai alle notifiche',
      },
    },
    businessLogo: {
      upload: "Carica il logo dell'impresa",
      modify: 'Modifica',
      uploadError: {
        title: 'Caricamento non riuscito',
        description:
          'Il caricamento del logo non è andato a buon fine. Verifica che il formato e la dimensione siano corretti e caricalo di nuovo.',
      },
      modifyError: {
        title: 'Caricamento non riuscito',
        description: 'Spiacenti, qualcosa è andato storto. Riprova più tardi',
      },
      size: 'Dimensione esatta 300 x <1/> 300px - Formato .png',
      info: 'Inserisci solo il logo della tua impresa. <1/> Sarai responsabile dell’inserimento di immagini diverse da quella indicata. ',
    },
    partyDetail: {
      businessName: 'Ragione sociale',
      fiscalCode: 'Codice Fiscale',
      mailAddress: 'Indirizzo PEC primario',
      editBusinessName: 'Modifica',
      editBusinessNameModal: {
        title: 'Modifica la ragione sociale',
        subTitle: 'Se la ragione sociale non è corretta, modificala qui.',
        textFieldLabel: 'Ragione sociale',
        invalidBusinessName: 'Inserisci una ragione sociale',
        notEqualBusinessName: 'Inserisci una ragione sociale diversa',
        disclaimer: 'Sarai responsabile dell’inserimento di dati diversi da quelli indicati.',
        cancel: 'Annulla',
        confirm: 'Conferma',
        success: {
          description: 'Ragione sociale modificata correttamente',
        },
        error: {
          description: 'Si è verificato un errore durante l’inserimento. Riprova.',
        },
      },
      editBusinessEmail: 'Modifica',
      editBusinessEmailModal: {
        title: "Modifica l'indirizzo PEC primario",
        subTitle: 'Se l’indirizzo PEC non è corretto, modificalo qui.',
        textFieldLabel: 'Indirizzo PEC',
        invalidEmail: "L'indirizzo PEC inserito non è corretto",
        notEqualBusinessEmail: 'Inserisci un indirizzo PEC diverso',
        disclaimer: 'Sarai responsabile dell’inserimento di dati diversi da quelli indicati.',
        cancel: 'Annulla',
        confirm: 'Conferma',
        success: {
          description: 'Indirizzo PEC modificato',
        },
        error: {
          description: 'Si è verificato un errore durante l’inserimento. Riprova.',
        },
      },
    },
  },
};
