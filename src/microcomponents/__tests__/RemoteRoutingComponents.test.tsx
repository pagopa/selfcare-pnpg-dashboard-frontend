import React from 'react';
import { render } from '@testing-library/react';
import RemoteRoutingUsers from '../users/RemoteRoutingUsers';
import {
  mockedInstitutionResources,
  mockedProductResources,
} from '../../api/__mocks__/DashboardApi';
import { Product } from '../../model/Product';
import { Party } from '../../model/Party';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RemoteRoutingGroups from '../groups/RemoteRoutingGroups';
import RemoteRoutingProductUsers from '../users/RemoteRoutingProductUsers';

test('renders the RemoteRoutingUsers and navigate its path', async () => {
  const history = createMemoryHistory();
  await render(
    <Router history={history}>
      <RemoteRoutingUsers
        party={mockedInstitutionResources[0] as unknown as Party}
        activeProducts={mockedProductResources as Array<Product>}
      />
    </Router>
  );

  history.push(`/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/users`);

  expect(history.location.pathname).toBe('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/users');
});

test('renders the RemoteRoutingGroups and navigate its path', async () => {
  const history = createMemoryHistory();
  await render(
    <Router history={history}>
      <RemoteRoutingGroups
        party={mockedInstitutionResources[0] as unknown as Party}
        activeProducts={mockedProductResources as Array<Product>}
      />
    </Router>
  );

  history.push('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/groups');

  expect(history.location.pathname).toBe('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/groups');
});

test('renders the RemoteRoutingGroups and navigate its path', async () => {
  const history = createMemoryHistory();
  await render(
    <Router history={history}>
      <RemoteRoutingProductUsers
        party={mockedInstitutionResources[0] as unknown as Party}
        activeProducts={mockedProductResources as Array<Product>}
      />
    </Router>
  );

  history.push('/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/prod-pn-pg/users');

  expect(history.location.pathname).toBe(
    '/dashboard/5b321318-3df7-48c1-67c8-1111e6707c3d/prod-pn-pg/users'
  );
});
