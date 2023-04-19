import { useEffect } from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { useTranslation, Trans } from 'react-i18next';
import { ReactComponent as NoBusiness } from '../../assets/no-business.svg';
import { ENV } from '../../utils/env';

export default function NoParty() {
  const { t } = useTranslation();

  useEffect(() => {
    trackEvent('DASHBOARD_ASSOCIATION_FAILURE', { event_name: 'DASHBOARD_ASSOCIATION_FAILURE' });
  }, []);

  return (
    <Grid
      direction="column"
      container
      display="flex"
      justifyContent="center"
      spacing={2}
      my={'auto'}
      sx={{ textAlign: 'center', display: 'flex', alignContent: 'center' }}
    >
      <Grid item container justifyContent="center">
        <Grid item xs={4}>
          <Grid mb={4}>
            <NoBusiness />
          </Grid>
          <Typography variant="h3" component="h2">
            <Trans i18nKey="businessSelection.noBusinessFound.title">
              L’impresa non è ancora <br />
              registrata
            </Trans>
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item xs={4}>
          <Box>
            <Typography variant="body1">
              <Trans i18nKey="businessSelection.noBusinessFound.description">
                La registrazione può essere effettuata solo da un Legale <br />
                Rappresentante.
              </Trans>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={2} mt={3}>
        <Button
          variant="contained"
          sx={{
            height: '46px',
            fontSize: 'fontSize',
          }}
          onClick={() => window.location.assign(ENV.URL_FE.ONBOARDING)}
        >
          {t('businessSelection.noBusinessFound.registerBusiness')}
        </Button>
      </Grid>
    </Grid>
  );
}
