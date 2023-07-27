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
    search: 'Search for a company',
    signIn: 'Login',
    noBusinessFound: {
      title: 'The company is not yet <1/>registered',
      description: 'Registration can only be made by a Legal <1/>Representative.',
      registerBusiness: 'Register a company',
    },
  },
  productsList: {
    yourBusiness: 'Your business',
    digitalNotifications: 'Digital notifications',
  },
  overview: {
    title: 'Overview',
    subTitle: 'View the data summary and read notifications from {{ businessName }}.',
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
      modify: 'Edit company logo',
      uploadError: {
        title: 'Upload failed',
        description:
          'The upload of the logo was not successful. Check that the format and size are correct and upload it again',
      },
      modifyError: {
        title: 'Upload failed',
        description: 'Sorry, something went wrong. Please try again later',
      },
      size: 'Maximum size 300 x <1/> 300px – .png format',
      info: 'Enter only your company logo. <1/> You will be responsible for inserting images other than the one indicated.',
    },
    partyDetail: {
      businessName: 'Company name',
      fiscalCode: 'Tax Code',
      mailAddress: 'Institutional email',
      editBusinessName: 'Edit',
      editBusinessNameModal: {
        title: 'Change the company name',
        subTitle: 'If the company name is not correct, edit it here.',
        textFieldLabel: 'Company name',
        invalidBusinessName: 'Enter a company name',
        notEqualBusinessName: 'Enter a different company name',
        disclaimer: 'You will be responsible for entering data other than those indicated.',
        cancel: 'Cancel',
        confirm: 'Confirm',
        success: {
          description: 'Company name changed correctly',
        },
        error: {
          description: 'An error occurred while entering. Please try again.',
        },
      },
      editBusinessEmail: 'Edit',
      editBusinessEmailModal: {
        title: 'Edit institutional email address',
        subTitle: 'If the email address is not correct, edit it here.',
        textFieldLabel: 'Institutional email',
        invalidEmail: 'The email you entered is incorrect',
        notEqualBusinessEmail: 'Enter a different institutional email',
        disclaimer: 'You will be responsible for entering data other than those indicated.',
        cancel: 'Cancel',
        confirm: 'Confirm',
        success: {
          description: 'Institutional email changed correctly',
        },
        error: {
          description: 'An error occurred while entering. Please try again.',
        },
      },
    },
  },
};
