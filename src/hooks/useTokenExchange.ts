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
      : retrieveBackOfficeUrl(selectedParty, product)
          .then((url) => {
            setLoading(true);
            trackEvent(
              'DASHBOARD_OPEN_PRODUCT',
              {
                party_id: selectedParty.partyId,
                product_id: product.id,
                product_role: product.userRole,
                target: 'prod',
              },
              () => window.location.assign(url)
            );
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
