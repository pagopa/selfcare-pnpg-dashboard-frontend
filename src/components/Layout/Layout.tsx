import { Grid, Box } from '@mui/material';
import { Footer } from '@pagopa/selfcare-common-frontend';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import React from 'react';
import DashboardHeader from '../DashboardHeader';
import withParties from '../../decorators/withParties';
import { loggedUser } from '../../api/__mocks__/DashboardPnpgApiClient';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const onExit = useUnloadEventOnExit();
  /* TODO Actually we are currently using a mocked user expecting the B4F in order 
  to test the ride and waiting for the login service. When this is available, this line will be uncommented and mockedLoggedUser removed

  // const loggedUser = useSelector(userSelectors.selectLoggedUser); */

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <DashboardHeader onExit={onExit} loggedUser={loggedUser} />
      <Grid container direction="row" flexGrow={1}>
        {children}
      </Grid>
      <Footer onExit={onExit} loggedUser={!!loggedUser} />
    </Box>
  );
};
export default withParties(Layout);
