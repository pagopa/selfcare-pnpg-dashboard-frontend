export default {
  session: {
    expired: {
      title: 'Session expired',
      message: 'You are being redirected to the login page...',
    },
  },
  unmanageableBusiness: 'The selected company cannot be managed',
  businessSelection: {
    title: 'Select your company',
    subTitle:
      "If you read notifications from multiple companies, you'll be able to change your choice after logging in.",
    onboardAnotherBusiness: 'Are you a Legal representative? <1>Register a new company</1>',
    search: 'Search for a company',
    signIn: 'Login',
    noBusinessFound: {
      title: 'To read notifications, you must <1/>first registered your company ',
      description: 'Registration can only be performed by a Legal <1/>representative.',
      registerBusiness: 'Start',
    },
  },
  productsList: {
    yourBusiness: 'Your company',
  },
  overview: {
    title: 'Overview',
    subTitle: 'View the data summary and read the notifications for {{ businessName }}.',
    sideMenu: {
      institutionManagement: {
        title: 'Institution management',
        overview: {
          title: 'Overview',
        },
        referents: {
          title: 'Users',
        },
        groups: {
          title: 'Groups',
        },
      },
    },
    notificationAreaProduct: {
      title: 'Digital notifications',
      card: {
        title: 'Go to notifications',
      },
    },
    businessLogo: {
      upload: 'Upload your company’s logo',
      modify: 'Change',
      uploadError: {
        title: 'Upload failed',
        description:
          'The logo upload was unsuccessful. Check that the format and size are correct and upload it again.',
      },
      modifyError: {
        title: 'Uploading unsuccessful',
        description: 'Sorry, something went wrong. Try again later',
      },
      size: 'Exact dimensions 300 x <1/> 300px - Format .png',
      info: 'Enter only the logo of your company. <1/> You will be responsible for entering images different than the one indicated. ',
    },
    partyDetail: {
      businessName: 'Company name',
      fiscalCode: 'Tax code',
      mailAddress: 'Primary PEC address',
      editBusinessName: 'Change',
      editBusinessNameModal: {
        title: 'Change the company name',
        subTitle: 'If the company name is not correct, change it here.',
        textFieldLabel: 'Company name',
        invalidBusinessName: 'Enter a company name',
        notEqualBusinessName: 'Enter a different company name',
        disclaimer:
          'You will be responsible for entering data different than what is indicated here.',
        cancel: 'Cancel',
        confirm: 'Confirm',
        success: {
          description: 'Company name changed correctly',
        },
        error: {
          description: 'An error occurred while entering the information. Try again.',
        },
      },
      editBusinessEmail: 'Change',
      editBusinessEmailModal: {
        title: 'Change the primary PEC address',
        subTitle: 'If the PEC address is not correct, change it here.',
        textFieldLabel: 'PEC address',
        invalidEmail: 'The entered PEC address is not correct',
        notEqualBusinessEmail: 'Enter a different PEC address',
        disclaimer:
          'You will be responsible for entering data different than what is indicated here.',
        cancel: 'Cancel',
        confirm: 'Confirm',
        success: {
          description: 'PEC address changed',
        },
        error: {
          description: 'An error occurred while entering the information. Try again.',
        },
      },
    },
  },
};
