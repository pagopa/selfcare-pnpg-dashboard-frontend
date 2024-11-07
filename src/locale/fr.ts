export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé vers la page de connexion...',
    },
  },
  unmanageableBusiness: "L’entreprise sélectionnée n’est pas gérable",
  businessSelection: {
    title: 'Sélectionnez votre entreprise',
    subTitle:
      'Se leggi le notifiche di più imprese, potrai modificare la tua scelta dopo avere effettuato l’accesso.',
    onboardAnotherBusiness: 'Êtes-vous un Représentant Légal ? <1>Enregistrer une nouvelle entreprise</1>',
    search: 'Rechercher une entreprise',
    signIn: 'Se connecter',
    noBusinessFound: {
      title: 'Pour lire les notifications, vous devez <1/>d’abord enregistrer votre entreprise ',
      description: 'L’enregistrement ne peut être effectué que par un Représentant <1/>Légal.',
      registerBusiness: 'Démarrer',
    },
  },
  productsList: {
    yourBusiness: 'Votre entreprise',
  },
  overview: {
    title: 'Aperçu',
    subTitle: 'Consulter le résumé des données et lire les notifications de {{ businessName }}.',
    sideMenu: {
      institutionManagement: {
        title: 'Gestion Organisme',
        overview: {
          title: 'Aperçu',
        },
        referents: {
          title: 'Utilisateurs',
        },
        groups: {
          title: 'Groupes',
        },
      },
    },
    notificationAreaProduct: {
      title: 'Notifications numériques',
      card: {
        title: 'Aller aux notifications',
      },
    },
    businessLogo: {
      upload: "Télécharger le logo de l’entreprise",
      modify: 'Modifier',
      uploadError: {
        title: 'Échec du téléchargement',
        description:
          'Il caricamento del logo non è andato a buon fine. Verifica che il formato e la dimensione siano corretti e caricalo di nuovo.',
      },
      modifyError: {
        title: 'Échec du téléchargement',
        description: 'Désolé, un problème est survenu. Réessayer plus tard',
      },
      size: 'Dimension exacte 300 x <1/> 300px - Format .png',
      info: 'N’entrez que le logo de votre entreprise. <1/> Vous serez responsable de l’insertion d’images autres que celle indiquée. ',
    },
    partyDetail: {
      businessName: 'Raison sociale',
      fiscalCode: 'Code Fiscal',
      mailAddress: 'Adresse PEC primaire',
      editBusinessName: 'Modifier',
      editBusinessNameModal: {
        title: 'Modifier la raison sociale',
        subTitle: 'Si la raison sociale est incorrecte, modifiez-la ici.',
        textFieldLabel: 'Raison sociale',
        invalidBusinessName: 'Saisissez une raison sociale',
        notEqualBusinessName: 'Saisissez une raison sociale différente',
        disclaimer: 'Vous serez responsable de la saisie de données autres que celles indiquées.',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        success: {
          description: 'Raison sociale correctement modifiée',
        },
        error: {
          description: 'Une erreur s’est produite lors de la saisie. Réessayer.',
        },
      },
      editBusinessEmail: 'Modifier',
      editBusinessEmailModal: {
        title: "Modifier l’adresse PEC primaire",
        subTitle: 'Si l’adresse PEC est incorrecte, modifiez-la ici.',
        textFieldLabel: 'Adresse PEC',
        invalidEmail: "L’adresse PEC saisie est incorrecte",
        notEqualBusinessEmail: 'Saisissez une adresse PEC différente',
        disclaimer: 'Vous serez responsable de la saisie de données autres que celles indiquées.',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        success: {
          description: 'Adresse PEC modifiée',
        },
        error: {
          description: 'Une erreur s’est produite lors de la saisie. Réessayer.',
        },
      },
    },
  },
};
