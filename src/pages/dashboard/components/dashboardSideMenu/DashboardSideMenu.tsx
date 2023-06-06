import { List, Grid } from '@mui/material';
import { useHistory } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { useTranslation } from 'react-i18next';
import DashboardCustomize from '@mui/icons-material/DashboardCustomize';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import { DASHBOARD_ROUTES } from '../../../../routes';
import { ENV } from '../../../../utils/env';
import { Party } from '../../../../model/Party';
import DashboardSidenavItem from './DashboardSidenavItem';

type Props = {
  party: Party;
};

export default function DashboardSideMenu({ party }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const onExit = useUnloadEventOnExit();

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

  const isOVerviewSelected = window.location.pathname === overviewPath;
  const isRoleSelected = window.location.pathname.startsWith(usersPath);
  const isGroupSelected = window.location.pathname.startsWith(groupsPath);

  const canSeeSection = party.userRole === 'ADMIN';

  return (
    <Grid container item mt={1} width="100%">
      <Grid item xs={12}>
        <List sx={{ width: '100%' }}>
          <DashboardSidenavItem
            title={t('overview.sideMenu.institutionManagement.overview.title')}
            handleClick={() =>
              onExit(() => history.push(party.partyId ? overviewPath : overviewRoute))
            }
            isSelected={isOVerviewSelected}
            icon={DashboardCustomize}
          />
          {canSeeSection && (
            <DashboardSidenavItem
              title={t('overview.sideMenu.institutionManagement.referents.title')}
              handleClick={() => onExit(() => history.push(party.partyId ? usersPath : usersRoute))}
              isSelected={isRoleSelected}
              icon={PeopleAlt}
            />
          )}
          {canSeeSection && (
            <DashboardSidenavItem
              title={t('overview.sideMenu.institutionManagement.groups.title')}
              handleClick={() =>
                onExit(() => history.push(party.partyId ? groupsPath : groupsRoute))
              }
              isSelected={isGroupSelected}
              icon={SupervisedUserCircle}
            />
          )}
        </List>
      </Grid>
    </Grid>
  );
}
