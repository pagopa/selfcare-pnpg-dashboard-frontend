import { PartyPnpg } from '../model/PartyPnpg';
// import { Product } from '../model/Product';
// import { ProductsRolesMap } from '../model/ProductRole';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { partiesActions, partiesSelectors } from '../redux/slices/partiesSlice';
// import { fetchProducts } from '../services/productService';

export const useSelectedParty = (): {
  fetchSelectedParty: (partyId: string) => void;
} => {
  const dispatch = useAppDispatch();
  // const selectedParty = useAppSelector(partiesSelectors.selectPartySelected);
  // const selectedPartyProducts = useAppSelector(partiesSelectors.selectPartySelectedProducts);
  const parties = useAppSelector(partiesSelectors.selectPartiesList);
  const setParty = (party?: PartyPnpg) => dispatch(partiesActions.setPartySelected(party));
  // const setPartyProducts = (products?: Array<Product>) =>
  // dispatch(partiesActions.setPartySelectedProducts(products));
  // const setLoadingDetails = useLoading(LOADING_TASK_SEARCH_PARTY);
  // const setLoadingProducts = useLoading(LOADING_TASK_SEARCH_PRODUCTS);
  // const productsRolesMap = useAppSelector(partiesSelectors.selectPartySelectedProductsRolesMap);

  /*
  const fetchParty = (partyId: string) => {
    const chosenParty = parties?.find((p) => p.id === partyId);
    setParty(chosenParty);
  };

  const fetchProductLists = (partyId: string) =>
    fetchProducts(partyId).then((products) => {
      if (products) {
        setPartyProducts(products);
        dispatch(
          partiesActions.setPartySelectedProductsRolesMap(
            products
              .filter((p) => p.productOnBoardingStatus === 'ACTIVE')
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
        throw new Error(`Cannot find products of partyId ${partyId}`);
      }
    });
    */
  const fetchSelectedParty = (partyId: string) => {
    const chosenParty = parties?.find((p) => p.id === partyId);
    setParty(chosenParty);
  };

  return { fetchSelectedParty };
};
