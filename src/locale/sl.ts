export default {
  session: {
    expired: {
      title: 'Seja je potekla',
      message: 'Preusmerjeni boste na stran za prijavo ...',
    },
  },
  unmanageableBusiness: 'Izbranega podjetja ni mogoče upravljati',
  businessSelection: {
    title: 'Izberite svoje podjetje',
    subTitle:
      'Če ste prebrali obvestila več podjetij, boste lahko po prijavi spremenili svojo izbiro.',
    onboardAnotherBusiness: 'Ali ste zakoniti zastopnik? <1>Registracija novega podjetja</1>',
    search: 'Iskanje podjetja',
    signIn: 'Prijava',
    noBusinessFound: {
      title: 'Če želite prebrati obvestila, morate <1/>najprej registrirati svoje podjetje ',
      description: 'Registracijo lahko opravi samo pravni <1/>zastopnik.',
      registerBusiness: 'Začetek',
    },
  },
  productsList: {
    yourBusiness: 'Vaše podjetje',
  },
  overview: {
    title: 'Pregled',
    subTitle: 'Oglejte si povzetek podatkov in preberite obvestila {{ businessName }}.',
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
        title: 'Pojdi na obvestila',
      },
    },
    businessLogo: {
      upload: 'Naložite logotip podjetja',
      modify: 'Spremeni',
      uploadError: {
        title: 'Nalaganje ni uspelo',
        description:
          'Nalaganje logotipa ni uspelo. Preverite, ali sta format in velikost pravilna, in ga naložite znova.',
      },
      modifyError: {
        title: 'Nalaganje ni uspelo',
        description: 'Žal, nekaj je šlo narobe. Poskusite znova pozneje',
      },
      size: 'Natančna velikost 300 x <1/> 300px - format .png',
      info: 'Vnesite samo logotip vašega podjetja. <1/> Odgovorni boste za vstavljanje slik, ki niso navedene. ',
    },
    partyDetail: {
      businessName: 'Ime podjetja',
      fiscalCode: 'Davčna številka',
      mailAddress: 'Primarni potrjeni e-poštni naslov',
      editBusinessName: 'Spremeni',
      editBusinessNameModal: {
        title: 'Spremenite ime podjetja',
        subTitle: 'Če ime podjetja ni pravilno, ga spremenite tukaj.',
        textFieldLabel: 'Ime podjetja',
        invalidBusinessName: 'Vnesite ime podjetja',
        notEqualBusinessName: 'Vnesite drugo ime podjetja',
        disclaimer: 'Odgovorni boste za vnos podatkov, ki niso navedeni.',
        cancel: 'Prekliči',
        confirm: 'Potrdi',
        success: {
          description: 'Ime podjetja je bilo uspešno spremenjeno',
        },
        error: {
          description: 'Pri vnosu je prišlo do napake. Poskusite znova.',
        },
      },
      editBusinessEmail: 'Spremeni',
      editBusinessEmailModal: {
        title: 'Sprememba primarnega potrjenega e-poštnega naslova',
        subTitle: 'Če je potrjen e-poštni naslov napačen, ga spremenite tukaj.',
        textFieldLabel: 'Potrjen e-poštni naslov',
        invalidEmail: 'Vneseni potrjeni e-poštni naslov ni pravilen',
        notEqualBusinessEmail: 'Vnesite drugi potrjeni e-poštni naslov',
        disclaimer: 'Odgovorni boste za vnos podatkov, ki niso navedeni.',
        cancel: 'Prekliči',
        confirm: 'Potrdi',
        success: {
          description: 'Potrjeni e-poštni naslov je spremenjen',
        },
        error: {
          description: 'Pri vnosu je prišlo do napake. Poskusite znova.',
        },
      },
    },
  },
};
