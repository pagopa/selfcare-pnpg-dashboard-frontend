const PUBLIC_URL_INNER = import.meta.env.PUBLIC_URL || '/dashboard';
export const ENV = {
  ENV: import.meta.env.VITE_ENV,
  PUBLIC_URL: PUBLIC_URL_INNER,

  ASSISTANCE: {
    ENABLE: import.meta.env.VITE_ENABLE_ASSISTANCE === 'true',
    EMAIL: import.meta.env.VITE_PAGOPA_HELP_EMAIL,
  },

  ROUTES: {
    OVERVIEW: `${PUBLIC_URL_INNER}/:partyId`,
    USERS: `${PUBLIC_URL_INNER}/:partyId/users`,
    USERS_DETAIL: `${PUBLIC_URL_INNER}/:partyId/users/:userId`,
    PRODUCT_USERS: `${PUBLIC_URL_INNER}/:partyId/:productId/users`,
    GROUPS: `${PUBLIC_URL_INNER}/:partyId/groups`,
    GROUP_DETAIL: `${PUBLIC_URL_INNER}/:partyId/groups/:groupId`,
  },

  URL_FE: {
    LOGIN: import.meta.env.VITE_URL_FE_LOGIN,
    LOGOUT: import.meta.env.VITE_URL_FE_LOGOUT,
    ONBOARDING: import.meta.env.VITE_URL_FE_ONBOARDING,
    LANDING: import.meta.env.VITE_URL_FE_LANDING,
    ASSISTANCE: import.meta.env.VITE_URL_FE_ASSISTANCE,
  },

  URL_API: {
    DASHBOARD: import.meta.env.VITE_URL_API_DASHBOARD,
  },

  API_TIMEOUT_MS: {
    DASHBOARD: parseInt(import.meta.env.VITE_API_DASHBOARD_TIMEOUT_MS || '30000', 10),
  },

  URL_INSTITUTION_LOGO: {
    PREFIX: import.meta.env.VITE_URL_INSTITUTION_LOGO_PREFIX,
    SUFFIX: import.meta.env.VITE_URL_INSTITUTION_LOGO_SUFFIX,
  },

  ANALYTCS: {
    ENABLE: import.meta.env.VITE_ANALYTICS_ENABLE === 'true',
    MOCK: import.meta.env.VITE_ANALYTICS_MOCK === 'true',
    DEBUG: import.meta.env.VITE_ANALYTICS_DEBUG === 'true',
    TOKEN: import.meta.env.VITE_MIXPANEL_TOKEN,
    API_HOST: import.meta.env.VITE_MIXPANEL_API_HOST || 'https://api-eu.mixpanel.com',
  },
};
