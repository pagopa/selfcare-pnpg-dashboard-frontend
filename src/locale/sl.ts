export default {
  session: {
    expired: {
      title: 'Seja je potekla',
      message: 'Preusmerjeni boste na stran za prijavo...',
    },
  },
  unmanageableBusiness: 'Izbranega podjetja ni mogoče upravljati',
  businessSelection: {
    title: 'Izberite svoje podjetje',
    subTitle: 'Če berete obvestila več podjetij, boste lahko po prijavi spremenili svojo izbiro.',
    onboardAnotherBusiness: 'Ste zakoniti zastopnik? <1>Registrirajte novo podjetje</1>',
    search: 'Iskanje podjetja',
    signIn: 'Dostopaj',
    noBusinessFound: {
      title: 'Podjetje še ni <1/>registrano ',
      description: 'Registracijo lahko opravi samo zakoniti <1/>zastopnik.',
      registerBusiness: 'Registrirajte podjetje',
    },
  },
  productsList: {
    yourBusiness: 'Vaše podjetje',
    digitalNotifications: 'Digitalna obvestila',
  },
  overview: {
    title: 'Pregled',
    subTitle: 'Oglejte si povzetek podatkov in preberite obvestila {{ businessName }}.',
    sideMenu: {
      institutionManagement: {
        title: 'Upravljanje subjekta',
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
      modify: 'Uredite logotip podjetja',
      uploadError: {
        title: 'Nalaganje ni uspelo',
        description:
          'Nalaganje logotipa ni uspelo. Preverite, ali sta oblika in velikost pravilni, in ga znova naložite',
      },
      modifyError: {
        title: 'Nalaganje ni uspelo',
        description: 'Žal, nekaj je šlo narobe. Poskusite znova kasneje',
      },
      size: 'Največja velikost 300 x <1/> 300px - format .png',
      info: 'Vnesite samo logotip vašega podjetja. <1/> Odgovorni boste za vstavljanje slik, ki niso navedene. ',
    },
    partyDetail: {
      businessName: 'Ime podjetja',
      fiscalCode: 'Davčna številka',
      mailAddress: 'Institucionalna elektronska pošta',
      editBusinessName: 'Uredi',
      editBusinessNameModal: {
        title: 'Spremeni ime podjetja',
        subTitle: 'Če je ime podjetja napačno, ga uredite tukaj.',
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
      editBusinessEmail: 'Uredi',
      editBusinessEmailModal: {
        title: 'Uredi institucionalni e-poštni naslov',
        subTitle: 'Če je e-poštni naslov napačen, ga uredite tukaj.',
        textFieldLabel: 'Institucionalna elektronska pošta',
        invalidEmail: 'Vneseni e-poštni naslov ni veljaven',
        notEqualBusinessEmail: 'Vnesite drug institucionalni e-poštni naslov',
        disclaimer: 'Odgovorni boste za vnos podatkov, ki niso navedeni.',
        cancel: 'Prekliči',
        confirm: 'Potrdi',
        success: {
          description: 'Institucionalna e-pošta je bila uspešno spremenjena',
        },
        error: {
          description: 'Pri vnosu je prišlo do napake. Poskusite znova.',
        },
      },
    },
  },
};
