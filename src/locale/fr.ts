export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé(e) vers la page de connexion...',
    },
  },
  unmanageableBusiness: 'L’entreprise sélectionnée ne peut pas être traitée',
  businessSelection: {
    title: 'Sélectionner votre entreprise',
    subTitle:
      'Si vous lisez les notifications de plusieurs entreprises, vous pouvez modifier votre choix après vous être connecté(e).',
    onboardAnotherBusiness:
      'Êtes-vous un(e) représentant(e) légal(e) ? <1>Enregistrer une nouvelle entreprise</1>',
    search: 'Rechercher une entreprise',
    signIn: 'Se connecter',
    noBusinessFound: {
      title: 'L’entreprise n’est pas encore <1/>enregistrée ',
      description:
        'L’enregistrement ne peut être effectué que par un(e) représentant(e) légal(e) <1/>.',
      registerBusiness: 'Enregistrer une entreprise',
    },
  },
  productsList: {
    yourBusiness: 'Votre entreprise',
    digitalNotifications: 'Notifications numériques',
  },
  overview: {
    title: 'Aperçu',
    subTitle:
      'Consulter un résumé des informations et lire les notifications de {{ businessName }}.',
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
      upload: "Télécharger le logo de l'entreprise",
      modify: "Modifier le logo de l'entreprise",
      uploadError: {
        title: 'Le chargement a échoué',
        description:
          'Le chargement du logo a échoué. Vérifier que le format et la taille sont corrects et procéder à nouveau au téléchargement',
      },
      modifyError: {
        title: 'Le chargement a échoué',
        description: "Désolé, une erreur s'est produite. Réessayer plus tard",
      },
      size: 'Taille maximum 300 x <1/> 300px - Format .png',
      info: "Insérer uniquement le logo de votre entreprise. <1/> Vous serez responsable de l'insertion d'images autres que celles indiquées. ",
    },
    partyDetail: {
      businessName: 'Raison sociale',
      fiscalCode: "Code d'identification fiscale",
      mailAddress: 'E-mail institutionnel',
      editBusinessName: 'Modifier',
      editBusinessNameModal: {
        title: 'Modifier la raison sociale',
        subTitle: 'Si la raison sociale est incorrecte, vous pouvez la modifier ici.',
        textFieldLabel: 'Raison sociale',
        invalidBusinessName: 'Saisir une raison sociale',
        notEqualBusinessName: 'Saisir une raison sociale différente',
        disclaimer:
          "Vous serez responsable de l'insertion d'informations autres que celles demandées.",
        cancel: 'Annuler',
        confirm: 'Confirmer',
        success: {
          description: 'Raison sociale correctement modifiée',
        },
        error: {
          description: "Une erreur s'est produite lors de la saisie. Réessayer.",
        },
      },
      editBusinessEmail: 'Modifier',
      editBusinessEmailModal: {
        title: 'Modifier l’adresse e-mail institutionnelle',
        subTitle: 'Si l’adresse e-mail est incorrecte, vous pouvez la modifier ici.',
        textFieldLabel: 'E-mail institutionnel',
        invalidEmail: "L'adresse e-mail saisie est incorrecte",
        notEqualBusinessEmail: 'Saisir une adresse e-mail institutionnelle différente',
        disclaimer:
          "Vous serez responsable de l'insertion d'informations autres que celles demandées.",
        cancel: 'Annuler',
        confirm: 'Confirmer',
        success: {
          description: 'E-mail institutionnel correctement modifié',
        },
        error: {
          description: "Une erreur s'est produite lors de la saisie. Réessayer.",
        },
      },
    },
  },
};
