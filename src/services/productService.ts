import { DashboardApi } from '../api/DashboardApi';
import { Product, productResource2Product } from '../model/Product';
import { ProductRole } from '../model/ProductRole';
import {
  mockedPartyProducts,
  fetchProductRoles as fetchProductRolesMocked,
} from './__mocks__/productService';

export const fetchProducts = (): Promise<Array<Product>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return Promise.resolve(mockedPartyProducts);
  } else {
    return DashboardApi.getProducts().then((productResources) =>
      productResources ? productResources.map(productResource2Product) : []
    );
  }
};

export const fetchProductRoles = (product: Product): Promise<Array<ProductRole>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return fetchProductRolesMocked(product);
  } else {
    return DashboardApi.getProductRoles(product.id)
      .then((roles) =>
        roles
          ?.map((pr) =>
            pr?.productRoles?.map((r) => ({
              productId: product.id,
              partyRole: pr.partyRole,
              selcRole: pr.selcRole,
              multiroleAllowed: pr.multiroleAllowed,
              phasesAdditionAllowed: pr.phasesAdditionAllowed,
              productRole: r.code ?? '',
              title: r.label ?? '',
              description: r.description ?? '',
            }))
          )
          .flatMap((x) => x)
      )
      .catch((reason) => reason);
  }
};
