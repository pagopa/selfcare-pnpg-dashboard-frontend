export default {
  session: {
    expired: {
      title: 'Sessione scaduta',
      message: 'Stai per essere rediretto alla pagina di login...',
    },
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
    partyLogo: {
      upload: "Carica il logo dell'impresa",
      modify: "Modifica il logo dell'impresa",
      uploadError: {
        title: 'Caricamento non riuscito',
        description:
          'Il caricamento del logo non è andato a buon fine. Verifica che il formato e la dimensione siano corretti e caricalo di nuovo',
      },
      modifyError: {
        title: 'Caricamento non riuscito',
        description: 'Spiacenti, qualcosa è andato storto. Riprova più tardi',
      },
      size: 'Dimensione massima 300 x <1/> 300px - Formato .png',
      info: 'Inserisci solo il logo della tua impresa. <1/> Sarai responsabile dell’inserimento di immagini diverse da quella indicata. ',
    },
    partyDetail: {
      businessName: 'Ragione sociale',
      fiscalCode: 'Codice Fiscale',
    },
  },
};
