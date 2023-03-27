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
  const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);
  const store = useStore();
  const theme = useTheme();
  const { i18n } = useTranslation();

  /* TODO At the moment, the token is manually written due to PN login service issues.
   As soon as the outage is resolved, this TODO and implementation will be removed. */
  useEffect(() => {
    storageTokenOps.write(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFYbEZLNjlzVGtpSTRUelJsLUtZd1hQWlE0RTJhOXV2Z3hHRkNMMDA5eGcifQ.eyJmYW1pbHlfbmFtZSI6IkNpY2Vyb25lIiwiZmlzY2FsX251bWJlciI6IkNDUk1DVDA2QTAzQTQzM0giLCJuYW1lIjoiTWFyY28gVHVsbGlvIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6ImM4MzM3Nzk4LWU4NzItNGNlOS05M2NhLWYxNjQzMDk4NzNmOSIsImxldmVsIjoiTDIiLCJpYXQiOjE2Nzk2Njc2NTAsImV4cCI6MTY5OTc3NzY1MCwiYXVkIjoicG5wZy5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiaHR0cHM6Ly9odWItbG9naW4uc3BpZC5kZXYucG4ucGFnb3BhLml0IiwianRpIjoiXzg2NTEwMmYwOWIwODdlNGE0Y2IyIn0.gVLnlK2REM_doMVibRx_E8NT65CaHzv_29w0SxrGH_zN_nmB3iOO_jQixur49YbF0yimHORki2k9LO8Ut7A3G7MKTdnC4WFDGkfvmD2sJyPM-Tlzt2DrWfyfudBNeu8aC0ls8e3T-S_VwPN2SDZZn8ktUUL04OphnAC3FSSlzjD1WlhY8SjE0jkkglUm4VAkiI234I5ecoxGluAuL81oU2bD2Axgi4xUjtawqjhYUOuI5Z1nMZaFVFwWu3yWPRmmvdaBBf0iXTkuc7uSUVbtD96nn36jS5nPt0J8maa7jQ_grdla0q1ZE0_wqZcfScMGyEOMgaDlxKbCNKGQSiiQTw'
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
