export default {
  session: {
    expired: {
      title: 'Session expired',
      message: 'You are about to be redirected to the login page...',
    },
  },
  unmanageableBusiness: 'The selected company is not manageable',
  businessSelection: {
    title: 'Select your company',
    subTitle:
      "If you read notifications from multiple companies, you'll be able to change your choice after logging in.",
    onboardAnotherBusiness: 'Are you a Legal Representative? <1>Register a new company</1>',
    search: 'Search company',
    signIn: 'Log in',
    noBusinessFound: {
      title: 'To read notifications, you must <1/>first register your company ',
      description: 'Registration can only be made by a Legal <1/>Representative.',
      registerBusiness: 'Start',
    },
  },
  productsList: {
    yourBusiness: 'Your company',
  },
  overview: {
    title: 'Overview',
    subTitle: 'View your data summary and read notifications from {{ businessName }}.',
    sideMenu: {
      institutionManagement: {
        title: 'Organisation Management',
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
      upload: 'Upload company logo',
      modify: 'Edit',
      uploadError: {
        title: 'Upload failed',
        description:
          'The logo upload was unsuccessful. Check that the format and size are correct and upload it again.',
      },
      modifyError: {
        title: 'Upload failed',
        description: 'Sorry, something went wrong. Please try again later',
      },
      size: 'Exact size 300 x <1/> 300px – .png format',
      info: 'Please only enter your company logo. <1/> You will be responsible for inserting images other than the one indicated. ',
    },
    partyDetail: {
      businessName: 'Company name',
      fiscalCode: 'Fiscal code',
      mailAddress: 'Primary PEC',
      editBusinessName: 'Edit',
      editBusinessNameModal: {
        title: 'Change company name',
        subTitle: 'If the company name is incorrect, change it here.',
        textFieldLabel: 'Company name',
        invalidBusinessName: 'Please enter a company name',
        notEqualBusinessName: 'Please enter a different company name',
        disclaimer: 'You will be responsible for entering data other than those indicated.',
        cancel: 'Cancel',
        confirm: 'Confirm',
        success: {
          description: 'Company name changed successfully',
        },
        error: {
          description: 'An error occurred while entering. Please try again.',
        },
      },
      editBusinessEmail: 'Edit',
      editBusinessEmailModal: {
        title: 'Change primary PEC',
        subTitle: 'If the PEC is incorrect, please edit it here.',
        textFieldLabel: 'PEC',
        invalidEmail: 'The PEC entered is incorrect',
        notEqualBusinessEmail: 'Please enter a different PEC',
        disclaimer: 'You will be responsible for entering data other than those indicated.',
        cancel: 'Cancel',
        confirm: 'Confirm',
        success: {
          description: 'PEC changed',
        },
        error: {
          description: 'An error occurred while entering. Please try again.',
        },
      },
    },
  },
};
