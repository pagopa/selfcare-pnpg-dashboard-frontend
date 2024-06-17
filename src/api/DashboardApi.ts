import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
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
    const token = storageTokenOps.read();
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
    const result = await apiClient.v2RetrieveUserInstitutions({});
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getInstitution: async (institutionId: string): Promise<InstitutionResource> => {
    const result = await apiClient.v2GetInstitution({ institutionId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getProducts: async (): Promise<Array<ProductsResource>> => {
    const result = await apiClient.getProductsTreeUsingGET({});
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
    environment?: string,
    lang?: string
  ): Promise<string> => {
    const result = await apiClient.v2RetrieveProductBackofficeUsingGET({
      productId,
      institutionId,
      environment,
      lang,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  saveInstitutionLogo: async (institutionId: string, logo: File): Promise<boolean> => {
    const result = await apiClient.saveInstitutionLogoUsingPUT({ institutionId, logo });
    return extractResponse(result, 200, onRedirectToLogin);
  },
};
