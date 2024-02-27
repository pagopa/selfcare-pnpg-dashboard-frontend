import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { Party } from '../model/Party';
import { Product } from '../model/Product';
import { ProductsRolesMap } from '../model/ProductRole';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { partiesActions, partiesSelectors } from '../redux/slices/partiesSlice';
import { fetchPartyDetails } from '../services/partyService';
import { fetchProducts } from '../services/productService';
import { LOADING_TASK_SEARCH_PARTY, LOADING_TASK_SEARCH_PRODUCTS } from '../utils/constants';

export const useSelectedParty = (): {
  fetchSelectedParty: (partyId: string) => Promise<[Party | null, Array<Product> | null]>;
} => {
  const dispatch = useAppDispatch();
  const selectedParty = useAppSelector(partiesSelectors.selectPartySelected);
  const selectedPartyProducts = useAppSelector(partiesSelectors.selectPartySelectedProducts);
  const parties = useAppSelector(partiesSelectors.selectPartiesList);
  const setParty = (party?: Party) => dispatch(partiesActions.setPartySelected(party));
  const setPartyProducts = (products?: Array<Product>) =>
    dispatch(partiesActions.setPartySelectedProducts(products));
  const setLoadingDetails = useLoading(LOADING_TASK_SEARCH_PARTY);
  const setLoadingProducts = useLoading(LOADING_TASK_SEARCH_PRODUCTS);
  const productsRolesMap = useAppSelector(partiesSelectors.selectPartySelectedProductsRolesMap);

  const fetchParty = (partyId: string): Promise<Party | null> =>
    fetchPartyDetails(partyId).then((party) => {
      if (party) {
        const selectedParty = parties?.find((p) => p.partyId === partyId);
        if (selectedParty && selectedParty.status !== 'ACTIVE') {
          throw new Error(`INVALID_PARTY_STATE_${party.status}`);
        }
        const partyWithUserRoleAndStatus = {
          ...party,
          status: selectedParty?.status,
          userRole: selectedParty?.userRole,
        };
        setParty(partyWithUserRoleAndStatus);
        return party;
      } else {
        throw new Error(`Cannot find partyId ${partyId}`);
      }
    });
  const fetchProductLists = () =>
    fetchProducts().then((products) => {
      if (products) {
        setPartyProducts(products);
        dispatch(
          partiesActions.setPartySelectedProductsRolesMap(
            products
              .filter((p) =>
                selectedParty?.products.map(
                  (us) => us.productId === p.id && us.productOnBoardingStatus === 'ACTIVE'
                )
              )
              .reduce((acc, p) => {
                const rolesMap = productsRolesMap[p.id];
                if (rolesMap) {
                  // eslint-disable-next-line functional/immutable-data
                  acc[p.id] = rolesMap;
                }
                return acc;
              }, {} as ProductsRolesMap)
          )
        );
        return products;
      } else {
        throw new Error(`Cannot find products`);
      }
    });

  const fetchSelectedParty = (partyId: string) => {
    if (
      !selectedParty ||
      selectedParty.partyId !== partyId ||
      selectedParty.externalId !== partyId
    ) {
      setLoadingDetails(true);
      setLoadingProducts(true);

      const partyDetailPromise: Promise<Party | null> = fetchParty(partyId).finally(() =>
        setLoadingDetails(false)
      );

      const partyProductsPromise: Promise<Array<Product> | null> = fetchProductLists().finally(() =>
        setLoadingProducts(false)
      );

      return Promise.all([partyDetailPromise, partyProductsPromise]).catch((e) => {
        setParty(undefined);
        setPartyProducts(undefined);
        throw e;
      });
    } else {
      return Promise.all([
        new Promise<Party>((resolve) => resolve(selectedParty)),
        new Promise<Array<Product>>((resolve) => resolve(selectedPartyProducts ?? [])),
      ]);
    }
  };

  return { fetchSelectedParty };
};
