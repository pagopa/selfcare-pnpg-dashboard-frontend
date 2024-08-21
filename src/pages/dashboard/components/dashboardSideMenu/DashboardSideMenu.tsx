import DashboardCustomize from '@mui/icons-material/DashboardCustomize';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import { Grid, List } from '@mui/material';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Party } from '../../../../model/Party';
import { DASHBOARD_ROUTES } from '../../../../routes';
import { ENV } from '../../../../utils/env';
import DashboardSidenavItem from './DashboardSidenavItem';

type Props = {
  party: Party;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardSideMenu({ party, setDrawerOpen }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const onExit = useUnloadEventOnExit();
  const { getAllProductsWithPermission } = usePermissions();

  const overviewRoute = DASHBOARD_ROUTES.OVERVIEW.path;
  const usersRoute = ENV.ROUTES.USERS;
  const groupsRoute = ENV.ROUTES.GROUPS;

  const overviewPath = resolvePathVariables(overviewRoute, {
    partyId: party.partyId,
  });
  const usersPath = resolvePathVariables(usersRoute, {
    partyId: party.partyId,
  });
  const groupsPath = resolvePathVariables(groupsRoute, {
    partyId: party.partyId,
  });

  const isOverviewSelected = window.location.pathname === overviewPath;
  const isRoleSelected = window.location.pathname.startsWith(usersPath);
  const isGroupSelected = window.location.pathname.startsWith(groupsPath);

  const canSeeUsers = getAllProductsWithPermission(Actions.ManageProductUsers).length > 0;
  const canSeeGroups = getAllProductsWithPermission(Actions.ManageProductGroups).length > 0;

  return (
    <Grid container item width="100%">
      <Grid item xs={12}>
        <List>
          <DashboardSidenavItem
            title={t('overview.sideMenu.institutionManagement.overview.title')}
            handleClick={() =>
              onExit(() => {
                history.push(party.partyId ? overviewPath : overviewRoute);
                setDrawerOpen(false);
              })
            }
            isSelected={isOverviewSelected}
            icon={DashboardCustomize}
          />
          {canSeeUsers && (
            <DashboardSidenavItem
              title={t('overview.sideMenu.institutionManagement.referents.title')}
              handleClick={() => {
                onExit(() => history.push(party.partyId ? usersPath : usersRoute));
                setDrawerOpen(false);
              }}
              isSelected={isRoleSelected}
              icon={PeopleAlt}
            />
          )}
          {canSeeGroups && (
            <DashboardSidenavItem
              title={t('overview.sideMenu.institutionManagement.groups.title')}
              handleClick={() => {
                onExit(() => history.push(party.partyId ? groupsPath : groupsRoute));
                setDrawerOpen(false);
              }}
              isSelected={isGroupSelected}
              icon={SupervisedUserCircle}
            />
          )}
        </List>
      </Grid>
    </Grid>
  );
}
