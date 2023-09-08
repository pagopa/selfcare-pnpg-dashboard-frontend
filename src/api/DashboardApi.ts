// import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import i18n from '@pagopa/selfcare-common-frontend/locale/locale-utils';
import { ENV } from '../utils/env';
import { store } from '../redux/store';
import { InstitutionResource } from './generated/b4f-dashboard-pnpg/InstitutionResource';
import { createClient, WithDefaultsT } from './generated/b4f-dashboard-pnpg/client';
import { ProductsResource } from './generated/b4f-dashboard-pnpg/ProductsResource';
import { ProductRoleMappingsResource } from './generated/b4f-dashboard-pnpg/ProductRoleMappingsResource';
import { InstitutionBaseResource } from './generated/b4f-dashboard-pnpg/InstitutionBaseResource';

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9iNjowMjozMzowMzpjYTpmZTo1MzowODoyNjpmMTpjYzpiZTo1ZTowNjplNzowYyJ9.eyJmYW1pbHlfbmFtZSI6IkNhdG9uZSIsImZpc2NhbF9udW1iZXIiOiJDVE5NQ1A4MEEwMUg1MDFNIiwibmFtZSI6Ik1hcmNvIFBvcmNpbyIsImZyb21fYWEiOmZhbHNlLCJ1aWQiOiI3MWQxZmMzNS1kZWJmLTQ3NjMtODc5ZS0xOTMyOWU3N2NhODMiLCJsZXZlbCI6IkwyIiwiaWF0IjoxNjk0MTc5OTgzLCJleHAiOjE2OTQyMTIzODMsImF1ZCI6ImFwaS1wbnBnLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiX2ZhN2I4Y2NiMjczMWNkYjlhNGM3In0.mObWN4muU-BWtW1gi1qFI69xTQKm5YEyOqzSQbbOJV4zm7tGQGfWAHaOc1m1Fs_VnuGK6G8vq8DWXc5Qo6r4JZyQPGWR4htTh9NrJpuTFkFoD9ALWuZqEAfS__Q9CrDQ6RpW5augnBx0_Q7TVV33zd8h9oZZARrESJA6bu5KbnH8bYF34-3OHs6JuSTd3TLuuY2TPhZ8k2rWryLPd8hACrpYo2mRMuAjR5IsBNVgTg3GluPI-4P-Yig_Fm-JDmnWq-DwfJTH3iX0SDpdxoU0dtj1yLNawACyoN_XM4CTi37rRxuZd1-G1R4G9N6BJIdZxI5W_dO991bZFwb-i-zZrA';
    // const token = storageTokenOps.read();
    return wrappedOperation({
      ...params,
      bearerAuth: `Bearer ${token}`,
    });
  };

const apiClient = createClient({
  baseUrl: ENV.URL_API.DASHBOARD,
  basePath: '',
  fetchApi: buildFetchApi(),
  withDefaults: withBearerAndInstitutionId,
});

const onRedirectToLogin = () =>
  store.dispatch(
    appStateActions.addError({
      id: 'tokenNotValid',
      error: new Error(),
      techDescription: 'token expired or not valid',
      toNotify: false,
      blocking: false,
      displayableTitle: i18n.t('session.expired.title'),
      displayableDescription: i18n.t('session.expired.message'),
    })
  );

export const DashboardApi = {
  getInstitutions: async (): Promise<Array<InstitutionBaseResource>> => {
    const result = await apiClient.getInstitutionsUsingGET({});
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getInstitution: async (institutionId: string): Promise<InstitutionResource> => {
    const result = await apiClient.getInstitutionUsingGET({ institutionId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getProducts: async (institutionId: string): Promise<Array<ProductsResource>> => {
    const result = await apiClient.getInstitutionProductsUsingGET({ institutionId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getProductRoles: async (productId: string): Promise<Array<ProductRoleMappingsResource>> => {
    const result = await apiClient.getProductRolesUsingGET({
      productId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  updateBusinessData: async (
    institutionId: string,
    digitalAddress?: string,
    businessName?: string
  ): Promise<boolean> => {
    const result = await apiClient.updateInstitutionDescriptionUsingPUT({
      institutionId,
      body: {
        description: businessName,
        digitalAddress,
      },
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  retrieveProductBackoffice: async (
    productId: string,
    institutionId: string,
    environment?: string
  ): Promise<string> => {
    const result = await apiClient.retrieveProductBackofficeUsingGET({
      productId,
      institutionId,
      environment,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  saveInstitutionLogo: async (institutionId: string, logo: File): Promise<boolean> => {
    const result = await apiClient.saveInstitutionLogoUsingPUT({ institutionId, logo });
    return extractResponse(result, 200, onRedirectToLogin);
  },
};
