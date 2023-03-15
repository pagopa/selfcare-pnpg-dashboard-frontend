import { Grid, Box, useTheme } from '@mui/material';
import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import { PartyPnpg } from '../../model/PartyPnpg';
import { Product, ProductsMap } from '../../model/Product';
import { useAppSelector } from '../../redux/hooks';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import { DASHBOARD_ROUTES, RouteConfig, RoutesObject } from '../../routes';
import { ENV } from '../../utils/env';
import RemoteRoutingUsers from '../../microcomponents/users/RemoteRoutingUsers';
import RemoteRoutingGroups from '../../microcomponents/groups/RemoteRoutingGroups';
import withSelectedParty from '../../decorators/withSelectedParty';
import DashboardOverview from '../dashboardOverview/DashboardOverview';
import {
  ProductOnBoardingStatusEnum,
  StatusEnum,
} from '../../api/generated/b4f-dashboard/ProductsResource';
import DashboardSideMenu from './components/dashboardSideMenu/DashboardSideMenu';

export type DashboardPageProps = {
  party: PartyPnpg;
  products: Array<Product>;
  activeProducts: Array<Product>;
  productsMap?: ProductsMap;
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
  rs: RoutesObject,
  products?: Array<Product>,
  activeProducts?: Array<Product>,
  productsMap?: ProductsMap,
  decorators?: DashboardDecoratorsType
) =>
  Object.values(rs).map((route, i) => {
    const { path, exact, component: Component, subRoutes } = route;
    const decoratorResult =
      Component && decorators ? reduceDecorators(decorators, route) : undefined;
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
        {subRoutes && <Switch>{buildRoutes(party, subRoutes)}</Switch>} {/* TODO Fix Me */}
      </Route>
    );
  });

const Dashboard = () => {
  const history = useHistory();
  const store = useStore();
  const theme = useTheme();
  const { i18n } = useTranslation();
  const party = useAppSelector(partiesSelectors.selectPartySelected);
  // const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);

  /*
  const 
  activeProducts: Array<Product> =
    useMemo(() => products?.filter((p) => p.productOnBoardingStatus === 'ACTIVE'), [products]) ??
    [];

  const productsMap: ProductsMap =
    useMemo(() => buildProductsMap(products ?? []), [products]) ?? [];
*/

  const products = [
    // TODO REMOVE ME
    {
      logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pagopa/logo.png',
      id: 'prod-pnpg',
      title: 'Piattaforma Notifiche Persone Giuridiche',
      description: 'Piattaforma Notifiche Persone Giuridiche',
      authorized: true,
      status: StatusEnum.ACTIVE,
      productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
      urlBO: 'http://pagopa/bo',
      backOfficeEnvironmentConfigurations: undefined,

      urlPublic: 'http://pagopa/public',
      userRole: 'LIMITED',
      subProducts: [
        {
          id: 'cc',
          productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
          status: StatusEnum.ACTIVE,
          title: 'cc',
        },
      ],
      imageUrl:
        'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
      logoBgColor: '#0066CC',
    },
  ];

  return party ? (
    <Grid container item xs={12} sx={{ backgroundColor: 'background.paper' }}>
      <Grid component="nav" item xs={2}>
        <Box>
          <DashboardSideMenu party={party} />
        </Box>
      </Grid>
      <Grid item component="main" xs={10} sx={{ backgroundColor: '#F5F6F7' }} display="flex" pb={8}>
        <Switch>
          <Route path={ENV.ROUTES.OVERVIEW} exact={false}>
            <DashboardOverview />
          </Route>
          <Route path={ENV.ROUTES.USERS} exact={false}>
            <RemoteRoutingUsers
              party={party}
              products={products as Array<Product>} // TODO REMOVE ME
              activeProducts={products as Array<Product>} // TODO REMOVE ME
              // productsMap={productsMap}
              history={history}
              store={store}
              theme={theme}
              i18n={i18n}
            />
          </Route>
          <Route path={ENV.ROUTES.GROUPS} exact={false}>
            <RemoteRoutingGroups
              party={party}
              products={[
                // TODO REMOVE ME
                {
                  logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pagopa/logo.png',
                  id: 'prod-pnpg',
                  title: 'Piattaforma Notifiche Persone Giuridiche',
                  description: 'Piattaforma Notifiche Persone Giuridiche',
                  authorized: true,
                  status: StatusEnum.ACTIVE,
                  productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
                  urlBO: 'http://pagopa/bo',
                  backOfficeEnvironmentConfigurations: undefined,

                  urlPublic: 'http://pagopa/public',
                  userRole: 'LIMITED',
                  subProducts: [
                    {
                      id: 'cc',
                      productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
                      status: StatusEnum.ACTIVE,
                      title: 'cc',
                    },
                  ],
                  imageUrl:
                    'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
                  logoBgColor: '#0066CC',
                },
              ]}
              activeProducts={[
                // TODO REMOVE ME
                {
                  logo: 'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/prod-pagopa/logo.png',
                  id: 'prod-pnpg',
                  title: 'Piattaforma Notifiche Persone Giuridiche',
                  description: 'Piattaforma Notifiche Persone Giuridiche',
                  authorized: true,
                  status: StatusEnum.ACTIVE,
                  productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
                  urlBO: 'http://pagopa/bo',
                  backOfficeEnvironmentConfigurations: undefined,
                  urlPublic: 'http://pagopa/public',
                  userRole: 'LIMITED',
                  subProducts: [
                    {
                      id: 'cc',
                      productOnBoardingStatus: ProductOnBoardingStatusEnum.ACTIVE,
                      status: StatusEnum.ACTIVE,
                      title: 'cc',
                    },
                  ],
                  imageUrl:
                    'https://selcdcheckoutsa.z6.web.core.windows.net/resources/products/default/depict-image.jpeg',
                  logoBgColor: '#0066CC',
                },
              ]}
              // productsMap={productsMap}
              history={history}
              store={store}
              theme={theme}
              i18n={i18n}
            />
          </Route>
          {buildRoutes(
            party,
            DASHBOARD_ROUTES,
            products as Array<Product>,
            products as Array<Product>
          )}
          {/* TODO Remove casts */}
        </Switch>
      </Grid>
    </Grid>
  ) : (
    <> </>
  );
};

export default withSelectedParty(Dashboard);
