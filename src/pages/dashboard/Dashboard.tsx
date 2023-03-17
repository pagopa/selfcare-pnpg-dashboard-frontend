import { Grid, Box, useTheme } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { useStore } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import withSelectedParty from '../../decorators/withSelectedParty';
import withProductRolesMap from '../../decorators/withProductsRolesMap';
import withSelectedProduct from '../../decorators/withSelectedPartyProduct';
import withSelectedProductRoles from '../../decorators/withSelectedPartyProductAndRoles';
import { PartyPnpg } from '../../model/PartyPnpg';
import { buildProductsMap, Product, ProductsMap } from '../../model/Product';
import { useAppSelector } from '../../redux/hooks';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import { DASHBOARD_ROUTES, RouteConfig, RoutesObject } from '../../routes';
import { ENV } from '../../utils/env';
import RemoteRoutingUsers from '../../microcomponents/users/RemoteRoutingUsers';
import RemoteRoutingGroups from '../../microcomponents/groups/RemoteRoutingGroups';
import { mockedPartyProducts as products } from '../../services/__mocks__/productService';
import DashboardSideMenu from './components/dashboardSideMenu/DashboardSideMenu';

export type DashboardPageProps = {
  party: PartyPnpg;
  products: Array<Product>;
  activeProducts: Array<Product>;
  productsMap: ProductsMap;
};

export type DashboardDecoratorsType = {
  withProductRolesMap: (WrappedComponent: React.ComponentType<any>) => React.ComponentType<any>;
  withSelectedProduct: (WrappedComponent: React.ComponentType<any>) => React.ComponentType<any>;
  withSelectedProductRoles: (
    WrappedComponent: React.ComponentType<any>
  ) => React.ComponentType<any>;
};

const reduceDecorators = (
  decorators: DashboardDecoratorsType,
  route: RouteConfig
): ((WrappedComponent: React.ComponentType<any>) => React.ComponentType<any>) =>
  ['withProductRolesMap', 'withSelectedProductRoles', 'withSelectedProduct'].reduce(
    (out, decorator) =>
      (route as any)[decorator]
        ? (WrappedComponent: React.ComponentType<any>) =>
            (decorators as any)[decorator](out(WrappedComponent))
        : out,
    (WrappedComponent: React.ComponentType<any>) => WrappedComponent
  );

export const buildRoutes = (
  party: PartyPnpg,
  products: Array<Product>,
  activeProducts: Array<Product>,
  productsMap: ProductsMap,
  decorators: DashboardDecoratorsType,
  rs: RoutesObject
) =>
  Object.values(rs).map((route, i) => {
    const { path, exact, component: Component, subRoutes } = route;
    const decoratorResult = Component ? reduceDecorators(decorators, route) : undefined;
    const WrappedComponent = Component && decoratorResult ? decoratorResult(Component) : undefined;
    return (
      <Route path={path} exact={exact} key={i}>
        {WrappedComponent && (
          <WrappedComponent
            party={party}
            products={products}
            activeProducts={activeProducts}
            productsMap={productsMap}
          />
        )}
        {subRoutes && (
          <Switch>
            {buildRoutes(party, products, activeProducts, productsMap, decorators, subRoutes)}
          </Switch>
        )}
      </Route>
    );
  });

const Dashboard = () => {
  const history = useHistory();
  const party = useAppSelector(partiesSelectors.selectPartySelected);
  // const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);

  const store = useStore();
  const theme = useTheme();
  const { i18n } = useTranslation();

  // TODO This will be removed when the login service of PN is available
  useEffect(() => {
    storageTokenOps.write(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImQuZGVsbGF2YWxsZUB0ZXN0Lml0IiwiZmFtaWx5X25hbWUiOiJEZWxsYSBWYWxsZSIsImZpc2NhbF9udW1iZXIiOiJETExER0k1M1QzMEkzMjRFIiwibmFtZSI6IkRpZWdvIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjM5MzQ1MDcyLWU0YmYtNDYwOS04MmVhLTg4ZDE5NDUyNTM2YiIsImxldmVsIjoiTDIiLCJpYXQiOjE2NDAyNTU2ODMsImFwaSI6InBucGciLCJhdWQiOiJhcGkuZGV2LnNlbGZjYXJlLnBhZ29wYS5pdCIsImlzcyI6IlNQSUQiLCJqdGkiOiIwMUZRS0RQWjE1R1Q0U1RDUUFFNUVYQlZWTSJ9.XeaRUpqmHzevWAt9bojuvFogOUPpVkjQWEqAdKFYJo0icY5gA3BkRqYpQHuCudqrCQDmhi0zRh8o5sx-5OcavBDFEOZnF7dvdf3EWdnAuJvbDpifoNPvO1dUZUhN3u6MvtZwwJnuRi_a85jpquDM8qQH5F-r_s75P1IMeewXnNnAQKdets-xb6TreRcyM4q7fEYdBf21DJ6WmLC7x3i6yxWuJUY1DnEIHUbX7CwuW2GFZ6Zth1OuNNN2L9Nm3YLAy90lo-xQh4lGYMESgJmP98pNmBovPm193NiFSWmnQkuigmBAip87bnzqCx4MO5_RwDnVDxTdTim8faBxCI9SEA'
    );
  }, []);

  const activeProducts: Array<Product> =
    useMemo(() => products?.filter((p) => p.productOnBoardingStatus === 'ACTIVE'), [products]) ??
    [];

  const productsMap: ProductsMap =
    useMemo(() => buildProductsMap(products ?? []), [products]) ?? [];

  const decorators = { withProductRolesMap, withSelectedProduct, withSelectedProductRoles };

  return party && products ? (
    <Grid container item xs={12} sx={{ backgroundColor: 'background.paper' }}>
      <Grid component="nav" item xs={2}>
        <Box>
          <DashboardSideMenu party={party} />
        </Box>
      </Grid>
      <Grid item component="main" xs={10} sx={{ backgroundColor: '#F5F6F7' }} display="flex" pb={8}>
        <Switch>
          <Route path={ENV.ROUTES.USERS} exact={false}>
            <RemoteRoutingUsers
              party={party}
              products={products}
              activeProducts={activeProducts}
              productsMap={productsMap}
              history={history}
              store={store}
              theme={theme}
              i18n={i18n}
              decorators={decorators}
            />
          </Route>
          <Route path={ENV.ROUTES.GROUPS} exact={false}>
            <RemoteRoutingGroups
              party={party}
              products={products}
              activeProducts={activeProducts}
              productsMap={productsMap}
              history={history}
              store={store}
              theme={theme}
              i18n={i18n}
              decorators={decorators}
            />
          </Route>
          {buildRoutes(party, products, activeProducts, productsMap, decorators, DASHBOARD_ROUTES)}
        </Switch>
      </Grid>
    </Grid>
  ) : (
    <> </>
  );
};

export default withSelectedParty(Dashboard);
