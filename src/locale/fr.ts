export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé vers la page de connexion...',
    },
  },
  unmanageableBusiness: 'L’entreprise sélectionnée n’est pas gérable',
  businessSelection: {
    title: 'Sélectionnez votre entreprise',
    subTitle:
      'Si vous lisez les notifications de plusieurs entreprises, vous pourrez modifier votre choix après vous être connecté.',
    onboardAnotherBusiness:
      'Êtes-vous un représentant légal ? <1>Enregistrer une nouvelle entreprise</1>',
    search: 'Recherchez une entreprise',
    signIn: 'Se connecter',
    noBusinessFound: {
      title: 'Pour lire les notifications, vous devez <1/> d’abord enregistrer votre entreprise ',
      description: 'L’enregistrement ne peut être effectué que par un représentant légal <1/>.',
      registerBusiness: 'Commencer',
    },
  },
  productsList: {
    yourBusiness: 'Votre entreprise',
  },
  overview: {
    title: 'Aperçu',
    subTitle: 'Visualisez le résumé des données et lisez les notifications de {{ businessName }}.',
    sideMenu: {
      institutionManagement: {
        title: 'Gestion organisme',
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
      upload: 'Charger le logo de l’entreprise',
      modify: 'Modifier',
      uploadError: {
        title: 'Impossible de charger',
        description:
          'Le chargement du logo n’a pas réussi. Vérifiez que le format et la taille sont corrects et rechargez-le.',
      },
      modifyError: {
        title: 'Impossible de charger',
        description: 'Désolé, quelque chose s’est mal passé. Réessayer plus tard',
      },
      size: 'Taille exacte 300 x <1/> 300px - Format .png',
      info: 'Saisissez simplement le logo de votre entreprise. <1/> Vous serez responsable de l’insertion d’images autres que celles indiquées. ',
    },
    partyDetail: {
      businessName: 'Raison sociale',
      fiscalCode: 'Numéro fiscal',
      mailAddress: 'Adresse PEC primaire',
      editBusinessName: 'Modifier',
      editBusinessNameModal: {
        title: 'Modifier la raison sociale',
        subTitle: 'Si la raison sociale n’est pas correcte, modifiez-la ici.',
        textFieldLabel: 'Raison sociale',
        invalidBusinessName: 'Entrer le nom de l’entreprise',
        notEqualBusinessName: 'Entrer le nom de l’entreprise',
        disclaimer: 'Vous serez responsable de la saisie de données autres que celles indiquées.',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        success: {
          description: 'Raison sociale modifiée correctement',
        },
        error: {
          description: 'Une erreur s’est produite lors de la saisie. Réessayer.',
        },
      },
      editBusinessEmail: 'Modifier',
      editBusinessEmailModal: {
        title: 'Modifier l’adresse PEC primaire',
        subTitle: 'Si l’adresse PEC est incorrecte, modifiez-la ici.',
        textFieldLabel: 'Adresse courriel certifié',
        invalidEmail: 'L’adresse PEC saisie n’est pas correcte',
        notEqualBusinessEmail: 'Saisir une adresse PEC différente',
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
