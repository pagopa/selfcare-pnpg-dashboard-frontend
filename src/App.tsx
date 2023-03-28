import {
  ErrorBoundary,
  LoadingOverlay,
  UnloadEventHandler,
  UserNotifyHandle,
} from '@pagopa/selfcare-common-frontend';
import { Route, Switch } from 'react-router';
import withLogin from '@pagopa/selfcare-common-frontend/decorators/withLogin';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import Layout from './components/Layout/Layout';
import routes, { RoutesObject } from './routes';

const buildRoutes = (rs: RoutesObject) =>
  Object.values(rs).map(({ path, exact, component: Component, subRoutes }, i) => (
    <Route path={path} exact={exact} key={i}>
      {Component && <Component />}
      {subRoutes && <Switch>{buildRoutes(subRoutes)}</Switch>}
    </Route>
  ));

const App = () => {
  /* TODO At the moment, the token is manually written due to PN login service issues.
   As soon as the outage is resolved, this TODO and implementation will be removed. */
  useEffect(() => {
    storageTokenOps.write(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFYbEZLNjlzVGtpSTRUelJsLUtZd1hQWlE0RTJhOXV2Z3hHRkNMMDA5eGcifQ.eyJmYW1pbHlfbmFtZSI6IkNpY2Vyb25lIiwiZmlzY2FsX251bWJlciI6IkNDUk1DVDA2QTAzQTQzM0giLCJuYW1lIjoiTWFyY28gVHVsbGlvIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6ImM4MzM3Nzk4LWU4NzItNGNlOS05M2NhLWYxNjQzMDk4NzNmOSIsImxldmVsIjoiTDIiLCJpYXQiOjE2Nzk2Njc2NTAsImV4cCI6MTY5OTc3NzY1MCwiYXVkIjoicG5wZy5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiaHR0cHM6Ly9odWItbG9naW4uc3BpZC5kZXYucG4ucGFnb3BhLml0IiwianRpIjoiXzg2NTEwMmYwOWIwODdlNGE0Y2IyIn0.gVLnlK2REM_doMVibRx_E8NT65CaHzv_29w0SxrGH_zN_nmB3iOO_jQixur49YbF0yimHORki2k9LO8Ut7A3G7MKTdnC4WFDGkfvmD2sJyPM-Tlzt2DrWfyfudBNeu8aC0ls8e3T-S_VwPN2SDZZn8ktUUL04OphnAC3FSSlzjD1WlhY8SjE0jkkglUm4VAkiI234I5ecoxGluAuL81oU2bD2Axgi4xUjtawqjhYUOuI5Z1nMZaFVFwWu3yWPRmmvdaBBf0iXTkuc7uSUVbtD96nn36jS5nPt0J8maa7jQ_grdla0q1ZE0_wqZcfScMGyEOMgaDlxKbCNKGQSiiQTw'
    );
  }, []);

  return (
    <ErrorBoundary>
      <Layout>
        <LoadingOverlay />
        <UserNotifyHandle />
        <UnloadEventHandler />
        <Route path="*">
          <Redirect to={routes.PARTY_SELECTION.path} />
        </Route>
        {buildRoutes(routes)}
      </Layout>
    </ErrorBoundary>
  );
};

export default withLogin(App);
