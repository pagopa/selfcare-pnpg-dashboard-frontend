export default {
  session: {
    expired: {
      title: 'Seja je potekla',
      message: 'Preusmerjeni boste na stran za prijavo ...',
    },
  },
  unmanageableBusiness: "Izbrano podjetje se ne da upravljati",
  businessSelection: {
    title: 'Izberite svoje podjetje',
    subTitle:
      'Se leggi le notifiche di più imprese, potrai modificare la tua scelta dopo avere effettuato l’accesso.',
    onboardAnotherBusiness: 'Ali ste pravni zastopnik? <1>Registrirajte novo podjetje</1>',
    search: 'Poišči podjetje',
    signIn: 'Prijava',
    noBusinessFound: {
      title: 'Če želite prebrati obvestila, morate <1/>najprej registrirati svoje podjetje ',
      description: 'Registracijo lahko izvede le pravni <1/>zastopnik.',
      registerBusiness: 'Začni',
    },
  },
  productsList: {
    yourBusiness: 'Vaše podjetje',
  },
  overview: {
    title: 'Pregled',
    subTitle: 'Oglejte si povzetek podatkov in preberite obvestila podjetja {{ businessName }}.',
    sideMenu: {
      institutionManagement: {
        title: 'Upravljanje organizacije',
        overview: {
          title: 'Pregled',
        },
        referents: {
          title: 'Uporabniki',
        },
        groups: {
          title: 'Skupine',
        },
      },
    },
    notificationAreaProduct: {
      title: 'Digitalna obvestila',
      card: {
        title: 'Pojdite na obvestila',
      },
    },
    businessLogo: {
      upload: "Naložite logotip svojega podjetja",
      modify: 'Spremeni',
      uploadError: {
        title: 'Nalaganje ni uspelo',
        description:
          'Il caricamento del logo non è andato a buon fine. Verifica che il formato e la dimensione siano corretti e caricalo di nuovo.',
      },
      modifyError: {
        title: 'Nalaganje ni uspelo',
        description: 'Žal, nekaj je šlo narobe. Poskusite znova pozneje',
      },
      size: 'Natančna velikost 300 x <1/> 300px – Format .png',
      info: 'Vnesite samo logotip svojega podjetja. <1/> Prevzemate odgovornost za vstavljanje slik, ki so drugačne od navedenih. ',
    },
    partyDetail: {
      businessName: 'Naziv podjetja',
      fiscalCode: 'Davčna številka',
      mailAddress: 'Primarni naslov PEC',
      editBusinessName: 'Spremeni',
      editBusinessNameModal: {
        title: 'Spremenite naziv svojega podjetja',
        subTitle: 'Če naziv podjetja ni pravilen, ga spremenite tukaj.',
        textFieldLabel: 'Naziv podjetja',
        invalidBusinessName: 'Vnesite naziv svojega podjetja',
        notEqualBusinessName: 'Vnesite drug naziv svojega podjetja',
        disclaimer: 'Odgovorni boste za vnos podatkov, ki niso navedeni.',
        cancel: 'Prekliči',
        confirm: 'Potrdi',
        success: {
          description: 'Ime podjetja je pravilno spremenjeno',
        },
        error: {
          description: 'Med vstavljanjem je prišlo do napake. Poskusi ponovno.',
        },
      },
      editBusinessEmail: 'Spremeni',
      editBusinessEmailModal: {
        title: "Spremenite primarni naslov PEC",
        subTitle: 'Če naslov PEC ni pravilen, ga spremenite tukaj.',
        textFieldLabel: 'Naslov PEC',
        invalidEmail: "Vneseni naslov PEC ni pravilen",
        notEqualBusinessEmail: 'Vnesite drug naslov PEC',
        disclaimer: 'Odgovorni boste za vnos podatkov, ki niso navedeni.',
        cancel: 'Prekliči',
        confirm: 'Potrdi',
        success: {
          description: 'Naslov PEC je spremenjen',
        },
        error: {
          description: 'Med vstavljanjem je prišlo do napake. Poskusi ponovno.',
        },
      },
    },
  },
};
