import {
  ErrorBoundary,
  LoadingOverlay,
  UnloadEventHandler,
  UserNotifyHandle,
} from '@pagopa/selfcare-common-frontend';
import { Redirect, Route, Switch } from 'react-router';
import withLogin from '@pagopa/selfcare-common-frontend/decorators/withLogin';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import Layout from './components/Layout/Layout';
import routes, { RoutesObject } from './routes';

const buildRoutes = (rs: RoutesObject) =>
  Object.values(rs).map(({ path, exact, component: Component, subRoutes }, i) => (
    <Route path={path} exact={exact} key={i}>
      {Component && <Component />}
      {subRoutes && <Switch>{buildRoutes(subRoutes)}</Switch>}
    </Route>
  ));

const App = () => (
  <ErrorBoundary>
    <Layout>
      <LoadingOverlay />
      <UserNotifyHandle />
      <UnloadEventHandler />
      {buildRoutes(routes)}
      <Route path="*">
        <Redirect
          to={resolvePathVariables(routes.PARTY_DASHBOARD.path, {
            partyId: '00000000000',
          })}
        />
      </Route>
    </Layout>
  </ErrorBoundary>
);

export default withLogin(App);
