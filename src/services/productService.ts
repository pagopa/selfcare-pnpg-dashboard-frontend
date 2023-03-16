// import { DashboardPnpgApi } from '../api/DashboardPnpgApiClient';
import { Product } from '../model/Product';
import { ProductRole } from '../model/ProductRole';
import {
  mockedPartyProducts,
  fetchProductRoles as fetchProductRolesMocked,
} from './__mocks__/productService';

export const fetchProducts = (_partyId: string): Promise<Array<Product>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PRODUCTS === 'true') {
    return new Promise((resolve) => resolve(mockedPartyProducts));
  } else {
    console.log('fetchProducts');
    return new Promise((resolve) => resolve(mockedPartyProducts));
    /* DashboardPnpgApi.getProducts(partyId).then((productResources) =>
      productResources ? productResources.map(productResource2Product) : [] 
   ); */
  }
};

export const fetchProductRoles = (product: Product): Promise<Array<ProductRole>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PRODUCTS === 'true') {
    return fetchProductRolesMocked(product);
  } else {
    console.log('fetchProductRoles');
    return fetchProductRolesMocked(product);
  }
};
