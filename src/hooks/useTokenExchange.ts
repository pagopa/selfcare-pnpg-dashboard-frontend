import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { LOADING_TASK_TOKEN_EXCHANGE } from '../utils/constants';
import { Product } from '../model/Product';
import { retrieveBackOfficeUrl } from '../services/tokenExchangeService';
import { Party } from '../model/Party';

const hostnameRegexp = /^(?:https?:\/\/)([-.a-zA-Z0-9_]+)/;

export const useTokenExchange = () => {
  const addError = useErrorDispatcher();
  const setLoading = useLoading(LOADING_TASK_TOKEN_EXCHANGE);

  const invokeProductBo = async (product: Product, selectedParty: Party): Promise<void> => {
    const result = validateUrlBO(product?.urlBO);
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

    retrieveBackOfficeUrl(selectedParty, product)
      .then((url) => {
        setLoading(true);
        trackEvent(
          'DASHBOARD_OPEN_PRODUCT',
          {
            party_id: selectedParty.partyId,
            product_id: product.id,
            product_role: product.userRole,
          },
          () => window.location.assign(url)
        );
      })
      .catch((error) =>
        addError({
          id: `TokenExchangeError-${product.id}`,
          blocking: false,
          error,
          displayableTitle: 'Si è verificato un errore',
          displayableDescription:
            'Verifica la connessione e prova ad aggiornare la pagina. Se l’errore si ripete, riprova più tardi o contattaci.',
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
