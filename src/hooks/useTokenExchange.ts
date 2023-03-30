import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { LOADING_TASK_TOKEN_EXCHANGE } from '../utils/constants';
import { Product } from '../model/Product';
import { retrieveBackOfficeUrl } from '../services/tokenExchangeService';
import { PartyPnpg } from '../model/PartyPnpg';

const hostnameRegexp = /^(?:https?:\/\/)([-.a-zA-Z0-9_]+)/;

export const useTokenExchange = () => {
  const addError = useErrorDispatcher();
  const setLoading = useLoading(LOADING_TASK_TOKEN_EXCHANGE);

  const invokeProductBo = async (
    product: Product,
    selectedParty: PartyPnpg,
    selectedEnvironment?: string
  ): Promise<void> => {
    const selectedEnvironmentUrl = product.backOfficeEnvironmentConfigurations?.find(
      (p) => p.environment === selectedEnvironment
    )?.url;
    const result = selectedEnvironmentUrl
      ? validateUrlBO(selectedEnvironmentUrl)
      : validateUrlBO(product?.urlBO);
    if (result instanceof Error) {
      addError({
        id: `ValidationUrlError-${product?.id}`,
        blocking: false,
        error: result,
        techDescription: result.message,
        toNotify: true,
      });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedEnvironment
      ? retrieveBackOfficeUrl(selectedParty, product, selectedEnvironment)
          .then((url) => {
            setLoading(true);
            trackEvent(
              'DASHBOARD_OPEN_PRODUCT',
              {
                party_id: selectedParty.partyId,
                product_id: product.id,
                product_role: product.userRole,
                target: selectedEnvironment,
              },
              () => window.location.assign(url)
            );
          })
          .catch((error) =>
            addError({
              id: `TokenExchangeError-${product.id}`,
              blocking: false,
              error,
              techDescription: `Something gone wrong retrieving token exchange of test environment for product ${product.id}`,
              toNotify: true,
            })
          )
          .finally(() => setLoading(false))
      : fetch(
          'https://api-pnpg.dev.selfcare.pagopa.it/dashboard/v1/products/prod-pn-pg/back-office?institutionId=7e539862-0de6-452b-a832-9eb45d4af02d',
          {
            headers: {
              accept: '*/*',
              'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
              authorization:
                'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFYbEZLNjlzVGtpSTRUelJsLUtZd1hQWlE0RTJhOXV2Z3hHRkNMMDA5eGcifQ.eyJmYW1pbHlfbmFtZSI6IkNpY2Vyb25lIiwiZmlzY2FsX251bWJlciI6IkNDUk1DVDA2QTAzQTQzM0giLCJuYW1lIjoiTWFyY28gVHVsbGlvIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6ImM4MzM3Nzk4LWU4NzItNGNlOS05M2NhLWYxNjQzMDk4NzNmOSIsImxldmVsIjoiTDIiLCJpYXQiOjE2Nzk2Njc2NTAsImV4cCI6MTY5OTc3NzY1MCwiYXVkIjoicG5wZy5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiaHR0cHM6Ly9odWItbG9naW4uc3BpZC5kZXYucG4ucGFnb3BhLml0IiwianRpIjoiXzg2NTEwMmYwOWIwODdlNGE0Y2IyIn0.gVLnlK2REM_doMVibRx_E8NT65CaHzv_29w0SxrGH_zN_nmB3iOO_jQixur49YbF0yimHORki2k9LO8Ut7A3G7MKTdnC4WFDGkfvmD2sJyPM-Tlzt2DrWfyfudBNeu8aC0ls8e3T-S_VwPN2SDZZn8ktUUL04OphnAC3FSSlzjD1WlhY8SjE0jkkglUm4VAkiI234I5ecoxGluAuL81oU2bD2Axgi4xUjtawqjhYUOuI5Z1nMZaFVFwWu3yWPRmmvdaBBf0iXTkuc7uSUVbtD96nn36jS5nPt0J8maa7jQ_grdla0q1ZE0_wqZcfScMGyEOMgaDlxKbCNKGQSiiQTw',
            },
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          }
        )
          .then((r) => {
            void r.json().then((url) => window.location.assign(url));
          })
          .catch((error) =>
            addError({
              id: `TokenExchangeError-${product.id}`,
              blocking: false,
              error,
              techDescription: `Something gone wrong retrieving token exchange for product ${product.id}`,
              toNotify: true,
            })
          )
          .finally(() => setLoading(false));
  };
  return { invokeProductBo };
};

export const validateUrlBO = (url: string): string | Error => {
  const hostname = hostnameFromUrl(url);
  if (!hostname) {
    return new Error(`Cannot extract hostname from URL: ${url}`);
  }
  return hostname;
};

const hostnameFromUrl = (url: string): string | null => {
  const regexpResults = hostnameRegexp.exec(url);
  if (regexpResults && regexpResults.length > 1) {
    return regexpResults[1];
  } else {
    return null;
  }
};
