import { Grid, Box } from '@mui/material';
import { Footer } from '@pagopa/selfcare-common-frontend';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import React, { useEffect } from 'react';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
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

  // TODO This will be removed when the login service of PN is available
  useEffect(() => {
    storageTokenOps.write(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImQuZGVsbGF2YWxsZUB0ZXN0Lml0IiwiZmFtaWx5X25hbWUiOiJEZWxsYSBWYWxsZSIsImZpc2NhbF9udW1iZXIiOiJETExER0k1M1QzMEkzMjRFIiwibmFtZSI6IkRpZWdvIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjM5MzQ1MDcyLWU0YmYtNDYwOS04MmVhLTg4ZDE5NDUyNTM2YiIsImxldmVsIjoiTDIiLCJpYXQiOjE2NDAyNTU2ODMsImFwaSI6InBucGciLCJhdWQiOiJhcGkuZGV2LnNlbGZjYXJlLnBhZ29wYS5pdCIsImlzcyI6IlNQSUQiLCJqdGkiOiIwMUZRS0RQWjE1R1Q0U1RDUUFFNUVYQlZWTSJ9.XeaRUpqmHzevWAt9bojuvFogOUPpVkjQWEqAdKFYJo0icY5gA3BkRqYpQHuCudqrCQDmhi0zRh8o5sx-5OcavBDFEOZnF7dvdf3EWdnAuJvbDpifoNPvO1dUZUhN3u6MvtZwwJnuRi_a85jpquDM8qQH5F-r_s75P1IMeewXnNnAQKdets-xb6TreRcyM4q7fEYdBf21DJ6WmLC7x3i6yxWuJUY1DnEIHUbX7CwuW2GFZ6Zth1OuNNN2L9Nm3YLAy90lo-xQh4lGYMESgJmP98pNmBovPm193NiFSWmnQkuigmBAip87bnzqCx4MO5_RwDnVDxTdTim8faBxCI9SEA'
    );
  }, []);

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
