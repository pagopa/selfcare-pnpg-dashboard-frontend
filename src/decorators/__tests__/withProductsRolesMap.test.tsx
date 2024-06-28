import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { partiesActions } from '../../redux/slices/partiesSlice';
import { createStore } from '../../redux/store';
import { mockedPartyProducts } from '../../services/__mocks__/productService';
import { mockedInstitutions } from '../../services/__mocks__/partyService';
import withProductsRolesMap from '../withProductsRolesMap';

jest.mock('../../services/productService');

const renderApp = (injectedStore?: ReturnType<typeof createStore>) => {
  const store = injectedStore ? injectedStore : createStore();
  const Component = () => <>RENDERED</>;
  const DecoratedComponent = withProductsRolesMap(Component);
  render(
    <Provider store={store}>
      <DecoratedComponent />
    </Provider>
  );
  return store;
};

let fetchProductRolesSpy: jest.SpyInstance;

beforeEach(() => {
  fetchProductRolesSpy = jest.spyOn(require('../../services/productService'), 'fetchProductRoles');
});

test.skip('Test', async () => {
  const store = renderApp();
  await waitFor(() => screen.getByText('RENDERED'));
  await checkProductsRolesMapLength(0, store);

  store.dispatch(
    partiesActions.setPartySelectedProducts(
      mockedPartyProducts.filter((pp) =>
        mockedInstitutions
          .filter((i) =>
            i.products.some((p) => p.productId === pp.id && p.productOnBoardingStatus === 'ACTIVE')
          )
          .slice(0, 1)
      )
    )
  );
  renderApp(store);
  await waitFor(() => expect(screen.getAllByText('RENDERED').length).toBe(1));
  await checkProductsRolesMapLength(1, store);

  store.dispatch(partiesActions.setPartySelectedProducts(mockedPartyProducts));
  renderApp(store);
  await waitFor(() => expect(screen.getAllByText('RENDERED').length).toBe(2));
  await checkProductsRolesMapLength(
    mockedPartyProducts.filter((pp) =>
      mockedInstitutions
        .filter((i) =>
          i.products.some((p) => p.productId === pp.id && p.productOnBoardingStatus === 'ACTIVE')
        )
        .slice(0, 1)
    ).length,
    store
  );

  expect(fetchProductRolesSpy).toBeCalledTimes(
    mockedPartyProducts.filter((pp) =>
      mockedInstitutions
        .filter((i) =>
          i.products.some((p) => p.productId === pp.id && p.productOnBoardingStatus === 'ACTIVE')
        )
        .slice(0, 1)
    ).length
  );
});

const checkProductsRolesMapLength = async (
  expectedProductCached: number,
  store: ReturnType<typeof createStore>
) => {
  await waitFor(() =>
    expect(Object.keys(store.getState().parties.selectedProductsRolesMap).length).toBe(
      expectedProductCached
    )
  );
};
