import { useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { useTranslation, Trans } from 'react-i18next';
import { uniqueId } from 'lodash';
import { ReactComponent as NoBusiness } from '../../assets/no-business.svg';
import { ENV } from '../../utils/env';

export default function NoParty() {
  const { t } = useTranslation();

  const requestId = uniqueId();

  useEffect(() => {
    trackEvent('DASHBOARD_ASSOCIATION_FAILURE', { requestId });
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
              Per leggere le notifiche devi <br />
              prima registrare la tua impresa
            </Trans>
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item xs={4}>
          <Typography variant="body1">
            <Trans i18nKey="businessSelection.noBusinessFound.description">
              La registrazione può essere effettuata solo da un Legale <br />
              Rappresentante.
            </Trans>
          </Typography>
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
