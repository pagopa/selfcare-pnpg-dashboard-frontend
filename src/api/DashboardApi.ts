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
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF82ZDplNTphNDo4NToyYjplMDpjYjplYToyZDo5Yzo1MjoxMjpmZTphNTpmMjo2MCJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjUwOTZlNGM2LTI1YTEtNDVkNS05YmRmLTJmYjk3NGE3YzFjOCIsImxldmVsIjoiTDIiLCJpYXQiOjE2OTM5ODAzMDksImV4cCI6MTY5NDAxMjcwOSwiYXVkIjoiYXBpLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiX2Q0ODM3YjU2MzI2MzQwNjkwNzAyIn0.g6L90CXyONScwayQrk36ToLXyF0v4M4IS88tCdiie_DWdXCWiEGuC4G2h620mw1I4i06mKDvyG2qbcpDwSRl9tY1zRDAshjmBlSFp8ebRmbwtjFhemgX8rD0VtE4RtzbZoXKkC9RQbURkPOmyyLopFYxu4uGv8_OiOQA0dj09aXotO4fb2PJ0f08E_XEc0SR-JIBF8fdUYeDdjaTjAm7PtWVIn6qaeEtwhQemKi-gwnph0FdlztrlGSJLN8ukPVOpgS_HvupKeKVmNYrcTOSMeg35dhMn-_Pclsze6FOgcZHtrjrC9NCp27gfFkVKEkTvflWi2bjtmkzY35--_BKSg';
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
