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
import { PartyPnpg } from '../../../../model/PartyPnpg';
import DashboardSidenavItem from './DashboardSidenavItem';

type Props = {
  party: PartyPnpg;
};

export default function DashboardSideMenu({ party }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const onExit = useUnloadEventOnExit();

  const overviewRoute = DASHBOARD_ROUTES.OVERVIEW.path;
  const usersRoute = ENV.ROUTES.USERS;
  const groupsRoute = ENV.ROUTES.GROUPS;

  const overviewPath = resolvePathVariables(overviewRoute, {
    partyId: party.id,
  });
  const usersPath = resolvePathVariables(usersRoute, {
    partyId: party.id,
  });
  const groupsPath = resolvePathVariables(groupsRoute, {
    partyId: party.id,
  });

  const isOVerviewSelected = window.location.pathname === overviewPath;
  const isRoleSelected = window.location.pathname.startsWith(usersPath);
  const isGroupSelected = window.location.pathname.startsWith(groupsPath);

  return (
    <Grid container item mt={1} width="100%">
      <Grid item xs={12}>
        <List sx={{ width: '100%' }}>
          <DashboardSidenavItem
            title={t('overview.sideMenu.institutionManagement.overview.title')}
            handleClick={() => onExit(() => history.push(party.id ? overviewPath : overviewRoute))}
            isSelected={isOVerviewSelected}
            icon={DashboardCustomize}
          />
          <DashboardSidenavItem
            title={t('overview.sideMenu.institutionManagement.referents.title')}
            handleClick={() => onExit(() => history.push(party.id ? usersPath : usersRoute))}
            isSelected={isRoleSelected}
            icon={PeopleAlt}
          />
          <DashboardSidenavItem
            title={t('overview.sideMenu.institutionManagement.groups.title')}
            handleClick={() => onExit(() => history.push(party.id ? groupsPath : groupsRoute))}
            isSelected={isGroupSelected}
            icon={SupervisedUserCircle}
          />
        </List>
      </Grid>
    </Grid>
  );
}